import JobStatusNotifier from "~/core/JobStatusNotifier";

it('can set and call update callbacks', () => {
    const notifier = new JobStatusNotifier('my-alias', {key1: 'val1'});
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

    let wasNotifierCalled = false;

    notifier.onUpdated(jobStatus => {
        expect(jobStatus).toBe(jobStatus);
        expect(wasNotifierCalled).toBeFalsy();
        wasNotifierCalled = true;
    });

    notifier.triggerUpdate(jobStatus);

    expect(wasNotifierCalled).toBeTruthy();
});

it('can set and call loading callbacks', () => {
    const notifier = new JobStatusNotifier('my-alias', {key1: 'val1'});
    let wasNotifierCalled = false;

    notifier.onLoading(() => {
        expect(wasNotifierCalled).toBeFalsy();
        wasNotifierCalled = true;
    });

    notifier.triggerLoading();

    expect(wasNotifierCalled).toBeTruthy();
});

it('can set and call finished loading callbacks', () => {
    const notifier = new JobStatusNotifier('my-alias', {key1: 'val1'});
    let wasNotifierCalled = false;

    notifier.onFinishedLoading(() => {
        expect(wasNotifierCalled).toBeFalsy();
        wasNotifierCalled = true;
    });

    notifier.triggerFinishedLoading();

    expect(wasNotifierCalled).toBeTruthy();
});

it('can set and call error callbacks', () => {
    const notifier = new JobStatusNotifier('my-alias', {key1: 'val1'});

    let wasNotifierCalled = false;

    const error = new Error();

    notifier.onError(error => {
        expect(error).toBe(error);
        expect(wasNotifierCalled).toBeFalsy();
        wasNotifierCalled = true;
    });

    notifier.triggerError(error);

    expect(wasNotifierCalled).toBeTruthy();
});
