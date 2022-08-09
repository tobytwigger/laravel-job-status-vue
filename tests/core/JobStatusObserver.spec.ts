import JobStatusObserver from "../../dist/core/JobStatusObserver";
import JobStatusNotifier from "../../dist/core/JobStatusNotifier";
import axios from "axios";

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

afterEach(() => {
    jest.clearAllTimers();
})
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

it('sets an interval to poll for the job status', () => {
    (new JobStatusObserver('my-alias', {key1: 'val1'})).poll(500);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 500);
});

it('returns a notifier', () => {
    let response = (new JobStatusObserver('my-alias', {key1: 'val1'})).poll(500);
    expect(response).toBeInstanceOf(JobStatusNotifier);
})

it('releases the interval when cleanup is called', () => {
    let observer = new JobStatusObserver('my-alias', {key1: 'val1'});
    observer.poll(500);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 500);

    observer.cleanup();
});

it('updates the job status when the update is called', async () => {
    const jobStatus = {
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

    JobStatusObserver.setupClient('/url', mockedAxios);

    let observer = (new JobStatusObserver('my-alias', {key1: 'val1'}));

    let actions: string[] = [];
    let hasFinished = false;
    observer.poll(500)
        .onUpdated(jobStatus => actions.push('updated'))
        .onUpdated(jobStatus => actions.push(jobStatus))
        .onLoading(() => actions.push('loading'))
        .onFinishedLoading(() => actions.push('finishedLoading'))
        .onFinishedLoading(() => hasFinished = true)
        .onError(error => console.log(error))
        .onError(error => actions.push('error'))
        .onError(error => error);

    await observer.update();

    expect(actions).toStrictEqual(['loading', 'updated', jobStatus, 'finishedLoading']);
    expect(mockedAxios.get).toHaveBeenCalledWith(`/url/job-status?alias=my-alias&tags%5Bkey1%5D=val1`);
});

it('it calls update when the interval is called', () => {
    mockedAxios.get.mockResolvedValue({data: null});

    JobStatusObserver.setupClient('/url', mockedAxios);

    let observer = new JobStatusObserver('my-alias',{key1: 'val1'});

    let hasBeenCalledTimes: number = 0;

    observer.poll(500).onLoading(() => hasBeenCalledTimes += 1)

    expect(hasBeenCalledTimes).toBe(0);
    jest.runOnlyPendingTimers();
    expect(hasBeenCalledTimes).toBe(1);
    jest.runOnlyPendingTimers();
    expect(hasBeenCalledTimes).toBe(2);
    jest.runOnlyPendingTimers();
    expect(hasBeenCalledTimes).toBe(3);

})