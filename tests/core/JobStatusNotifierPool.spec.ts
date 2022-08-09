import JobStatus from "../../src/vue2/JobStatus";
import JobStatusNotifier from "../../dist/core/JobStatusNotifier";
import JobStatusNotifierPool from "../../dist/core/JobStatusNotifierPool";

it('creates a new instance on calling getInstance', () => {
    const instance = JobStatusNotifierPool.getInstance();
    expect(instance).toBeInstanceOf(JobStatusNotifierPool);
});

it('creates a job notifier and returns it', () => {
    let notifier = JobStatusNotifierPool.getInstance().get('my-alias', {key1: 'val1'});
    expect(notifier).toBeInstanceOf(JobStatusNotifier);
    expect(notifier.jobAlias).toBe('my-alias');
    expect(notifier.tags).toStrictEqual({key1: 'val1'});
});

it('saves a new job notifier and returns the same one later', () => {
    expect(JobStatusNotifierPool.getInstance().get('my-alias', {key1: 'val1'}).loadingCallbacks.length).toBe(0);
    let notifier = JobStatusNotifierPool.getInstance().get('my-alias', {key1: 'val1'});
    notifier.onLoading(() => false); // Add some callback to make the notifier unique

    // Try again
    expect(JobStatusNotifierPool.getInstance().get('my-alias', {key1: 'val1'})).toStrictEqual(notifier);
    expect(JobStatusNotifierPool.getInstance().get('my-alias', {key1: 'val1'}).loadingCallbacks.length).toBe(1);
});
