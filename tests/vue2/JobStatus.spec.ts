import {createLocalVue, mount, Wrapper} from '@vue/test-utils';
import JobStatus from "../../src/vue2/JobStatus";
import {JobStatus as JobStatusType} from "../../src/types/core";
import {installer} from '../../src';
import axios from "axios";
import {DefaultProps} from "../../src/types/core";
import JobStatusObserver from "../../dist/core/JobStatusObserver";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

afterEach(() => {
    jest.clearAllTimers();
})

let mountComponent = (options = {}) => {
    const localVue = createLocalVue()
    localVue.use(installer, {
        url: '/_url',
        axios: mockedAxios
    });

    return mount(JobStatus, {
        localVue, ...options
    });
}

let demoOptions = {
    propsData: {
        method: 'polling',
        jobAlias: 'my_alias',
        tags: {key1: 'val1'}
    },
    scopedSlots: {
        loading: '<div>loading</div>',
        default: '<template v-slot:default="params"><div>Job status: {{params.status}}. Last message: {{params.lastMessage}}. Complete? {{(params.complete ? \'Yes\' : \'No\')}}</div></template>',
        error: '<template v-slot:error="params"><div>Error: {{params.message}}</div></template>',
        empty: '<div>empty</div>'
    }
};

it('can receive a method of polling', () => {
    const wrapper = mountComponent(demoOptions);
    expect(wrapper.exists()).toBeTruthy();
});
it('shows the empty slot initially', () => {
    const jobStatus: JobStatusType = {
        created_at: "",
        id: 55,
        isFinished: false,
        job_alias: "my_alias",
        job_class: "",
        lastMessage: "",
        percentage: 0,
        run_count: 0,
        status: "",
        updated_at: ""
    };

    mockedAxios.get.mockResolvedValue({data: jobStatus});

    const wrapper = mountComponent(demoOptions);
    expect(wrapper.find('div>div').html()).toBe('<div>empty</div>');
});
it('shows the loading slot when a job status is loading', async () => {
    const jobStatus: JobStatusType = {
        created_at: "",
        id: 55,
        isFinished: false,
        job_alias: "my_alias",
        job_class: "",
        lastMessage: "",
        percentage: 0,
        run_count: 0,
        status: "",
        updated_at: ""
    };

    mockedAxios.get.mockResolvedValue({data: jobStatus});

    const wrapper = mountComponent(demoOptions);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div>div').html()).toBe('<div>loading</div>');
});
it('shows the empty slot if no job status is shown', async () => {
    mockedAxios.get.mockResolvedValue({data: null});

    const wrapper = mountComponent(demoOptions);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div>div').html()).toBe('<div>empty</div>');
});
it('shows the default slot if a job status is shown', async () => {
    const jobStatus: JobStatusType = {
        created_at: "",
        id: 55,
        isFinished: false,
        job_alias: "my_alias",
        job_class: "",
        lastMessage: "This was the last message",
        percentage: 0,
        run_count: 0,
        status: "queued",
        updated_at: ""
    };

    mockedAxios.get.mockResolvedValue({data: jobStatus});

    const wrapper = mountComponent(demoOptions);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div>div').html()).toBe('<div>Job status: queued. Last message: This was the last message. Complete? No</div>');
});
it('shows the error slot if an error occured', async() => {
    mockedAxios.get.mockImplementation(() => {
        throw new Error('This was the problem');
    });

    const wrapper = mountComponent(demoOptions);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick()
    expect(wrapper.find('div>div').html()).toBe('<div>Error: This was the problem</div>');
});
it('shows the default slot when a job status is loading but a job status is already retrieved in the component', async() => {
    const oldJobStatus: JobStatusType = {
        created_at: "",
        id: 55,
        isFinished: false,
        job_alias: "my_alias",
        job_class: "",
        lastMessage: "This was the old message",
        percentage: 0,
        run_count: 0,
        status: "queued",
        updated_at: ""
    };

    const newJobStatus: JobStatusType = {
        created_at: "",
        id: 55,
        isFinished: true,
        job_alias: "my_alias",
        job_class: "",
        lastMessage: "This is the new message",
        percentage: 0,
        run_count: 0,
        status: "finished",
        updated_at: ""
    };

    mockedAxios.get.mockResolvedValueOnce({data: oldJobStatus});
    mockedAxios.get.mockResolvedValueOnce({data: newJobStatus});

    const wrapper = mountComponent(demoOptions);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div>div').html()).toBe('<div>loading</div>');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div>div').html()).toBe('<div>Job status: queued. Last message: This was the old message. Complete? No</div>');
    wrapper.vm.jobStatusObserver.update();
    expect(wrapper.find('div>div').html()).toBe('<div>Job status: queued. Last message: This was the old message. Complete? No</div>');
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div>div').html()).toBe('<div>Job status: finished. Last message: This is the new message. Complete? Yes</div>');
});
it('sends a cancel signal from the default slot with the cancel function', async () => {
    const jobStatus: JobStatusType = {
        created_at: "",
        id: 55,
        isFinished: false,
        job_alias: "my_alias",
        job_class: "",
        lastMessage: "This was the last message",
        percentage: 0,
        run_count: 0,
        status: "queued",
        updated_at: ""
    };

    mockedAxios.get.mockResolvedValue({data: jobStatus});
    mockedAxios.post.mockResolvedValue(null);

    const wrapper = mountComponent({
        propsData: {
            method: 'polling',
            jobAlias: 'my_alias',
            tags: {key1: 'val1'}
        },
        scopedSlots: {
            default: '<div><button @click="props.cancel">Cancel</button></div>'
        }
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('button').html()).toBe('<button>Cancel</button>');
    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(`/_url/job-status/55/job-signal`, {
        signal: 'cancel',
        parameters: {},
        cancel_job: true
    });
});
it('sends a custom signal from the default slot with the signal function', async () => {
    const jobStatus: JobStatusType = {
        created_at: "",
        id: 55,
        isFinished: false,
        job_alias: "my_alias",
        job_class: "",
        lastMessage: "This was the last message",
        percentage: 0,
        run_count: 0,
        status: "queued",
        updated_at: ""
    };

    mockedAxios.get.mockResolvedValue({data: jobStatus});
    mockedAxios.post.mockResolvedValue(null);

    const wrapper = mountComponent({
        propsData: {
            method: 'polling',
            jobAlias: 'my_alias',
            tags: {key1: 'val1'}
        },
        scopedSlots: {
            default: '<div><button @click="() => props.signal(\'my-signal\', true, {key1: \'val1\'})">Cancel</button></div>'
        }
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('button').html()).toBe('<button>Cancel</button>');
    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(`/_url/job-status/55/job-signal`, {
        signal: 'my-signal',
        parameters: {key1: 'val1'},
        cancel_job: true
    });
});

it('removes the interval when the vue component is destroyed', async() => {
    const jobStatus: JobStatusType = {
        created_at: "",
        id: 55,
        isFinished: false,
        job_alias: "my_alias",
        job_class: "",
        lastMessage: "This was the last message",
        percentage: 0,
        run_count: 0,
        status: "queued",
        updated_at: ""
    };

    mockedAxios.get.mockResolvedValue({data: jobStatus});

    const wrapper = mountComponent(demoOptions);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 5000);

    wrapper.destroy();

    jest.runOnlyPendingTimers();
    expect(setInterval).toHaveBeenCalledTimes(1);
});

it('Shows a default slot for default', async() => {
    const jobStatus: JobStatusType = {
        created_at: "",
        id: 55,
        isFinished: false,
        job_alias: "my_alias",
        job_class: "",
        lastMessage: "This was the last message",
        percentage: 0,
        run_count: 0,
        status: "queued",
        updated_at: ""
    };

    mockedAxios.get.mockResolvedValue({data: jobStatus});

    const wrapper = mountComponent({
        propsData: {
            method: 'polling',
            jobAlias: 'my_alias',
            tags: {key1: 'val1'}
        }
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div').html()).toBe('<div>Please define a default slot to see the job status.</div>');

});

it('Show the empty slot if loading slot is not defined', async() => {
    const jobStatus: JobStatusType = {
        created_at: "",
        id: 55,
        isFinished: false,
        job_alias: "my_alias",
        job_class: "",
        lastMessage: "",
        percentage: 0,
        run_count: 0,
        status: "",
        updated_at: ""
    };

    mockedAxios.get.mockResolvedValue({data: jobStatus});

    const wrapper = mountComponent({
        propsData: {
            method: 'polling',
            jobAlias: 'my_alias',
            tags: {key1: 'val1'}
        },
        scopedSlots: {
            empty: '<div>empty</div>'
        }
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div').html()).toBe('<div>\n  <div>empty</div>\n</div>');
});

it('Passes if the component is loading to the empty slot', async() => {
    mockedAxios.get.mockResolvedValue({data: null});

    const wrapper = mountComponent({
        propsData: {
            method: 'polling',
            jobAlias: 'my_alias',
            tags: {key1: 'val1'}
        },
        scopedSlots: {
            empty: '<template v-slot:empty="params"><div>Is loading? {{(params.loading ? \'Yes\' : \'No\')}}</div></template>',
            default: '<template v-slot:default="params"><div>Job status: {{params.status}}. Last message: {{params.lastMessage}}. Complete? {{(params.complete ? \'Yes\' : \'No\')}}</div></template>',
            error: '<template v-slot:error="params"><div>Error: {{params.message}}</div></template>',
        }
    });

    console.log(wrapper.find('div').html());

    expect(wrapper.find('div').html()).toBe('<div>\n  <div>Is loading? No</div>\n</div>');
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div').html()).toBe('<div>\n  <div>Is loading? Yes</div>\n</div>');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div').html()).toBe('<div>\n  <div>Is loading? No</div>\n</div>');
});


it('Shows a default slot for error', async() => {
    mockedAxios.get.mockImplementation(() => {
        throw new Error('This was the problem');
    });

    const wrapper = mountComponent({
        propsData: {
            method: 'polling',
            jobAlias: 'my_alias',
            tags: {key1: 'val1'}
        }
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick()
    expect(wrapper.find('div').html()).toBe('<div>An error occured</div>');
});

it('Shows a default slot for empty', async() => {
    const jobStatus: JobStatusType = {
        created_at: "",
        id: 55,
        isFinished: false,
        job_alias: "my_alias",
        job_class: "",
        lastMessage: "",
        percentage: 0,
        run_count: 0,
        status: "",
        updated_at: ""
    };

    mockedAxios.get.mockResolvedValue({data: jobStatus});

    const wrapper = mountComponent({
        propsData: {
            method: 'polling',
            jobAlias: 'my_alias',
            tags: {key1: 'val1'}
        }
    });
    expect(wrapper.find('div').html()).toBe('<div>No job found</div>');
});