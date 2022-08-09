import ApiUrlGenerator from "../../dist/utils/ApiUrlGenerator";

it('returns the search url', () => {
    let generator = new ApiUrlGenerator('http://localhost/my-base-url');

    expect(
        generator.searchForJobStatus('my-alias', {key1: 'val1', key2: 'val2'})
    ).toBe(
        'http://localhost/my-base-url/job-status?alias=my-alias&tags%5Bkey1%5D=val1&tags%5Bkey2%5D=val2'
    );
});

it('returns the signal url', () => {
    let generator = new ApiUrlGenerator('http://localhost/my-base-url');

    expect(
        generator.sendSignal(44)
    ).toBe(
        'http://localhost/my-base-url/job-status/44/job-signal'
    );
});

it('can handle a url with a trailing /', () => {
    let generator = new ApiUrlGenerator('http://localhost/my-base-url/');

    expect(
        generator.sendSignal(44)
    ).toBe(
        'http://localhost/my-base-url/job-status/44/job-signal'
    );
});