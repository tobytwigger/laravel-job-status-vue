import JobStatusRepository from "../../../src/core/JobStatusRepository";
import axios from 'axios';
import {JobStatus} from "../../../src/types/core";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
    JobStatusRepository.clearInstance();
});

it('creates a new instance with the given parameters', () => {
    JobStatusRepository.createInstance('/url', axios);

    const repo = JobStatusRepository.getInstance();
    expect(repo.url).toBe('/url');
    expect(repo.axios).toBe(axios);
});

it('throws an exception if getInstance is called before createInstance', () => {
    expect(() => JobStatusRepository.getInstance()).toThrow(Error);
    expect(() => JobStatusRepository.getInstance()).toThrow('Please call createInstance before getting an instance of the job status repository');
});

it('sends a signal', async () => {
    mockedAxios.post.mockResolvedValue(null);
    JobStatusRepository.createInstance('/url', mockedAxios);

    let response = await JobStatusRepository.getInstance().sendSignal(
        55,
        'cancel',
        true,
        {triggered_at: '23:33'}
    );

    expect(response).toBeNull();
    expect(mockedAxios.post).toHaveBeenCalledWith(`/url/job-status/55/job-signal`, {
        signal: 'cancel',
        parameters: {triggered_at: '23:33'},
        cancel_job: true
    });
});

it('gets a job status', async () => {
    const jobStatus: JobStatus = {
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
    JobStatusRepository.createInstance('/url', mockedAxios);
    let response = await JobStatusRepository.getInstance().get(
        'my_alias',
        {key1: 'value1'}
    );

    expect(response).toBe(jobStatus);
    expect(mockedAxios.get).toHaveBeenCalledWith('/url/job-status?alias=my_alias&tags%5Bkey1%5D=value1');
});

it('throws an error if getting a job status fails', async() => {

});

it('throws an error if sending a signal fails', async() => {

});

it('handles a url with a trailing slash for signals', () => {

});

it('handles a url with a trailing slash for getting a job status', () => {

});