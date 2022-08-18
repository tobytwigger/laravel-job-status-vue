import NotifierCollection from "~/core/NotifierCollection";
import JobStatusNotifier from "~/core/JobStatusNotifier";

it('saves and retrieves a job status notifier', () => {
    let collection = new NotifierCollection();
    let notifier = new JobStatusNotifier('alias', {key1: 'val1'});
    collection.push(notifier);

    expect(collection.get('alias', {key1: 'val1'})).toBeInstanceOf(JobStatusNotifier);
    expect(collection.get('alias', {key1: 'val1'})?.jobAlias).toBe('alias');
    expect(collection.get('alias', {key1: 'val1'})?.tags).toStrictEqual({key1: 'val1'});
});

it('returns null if there is no job status notifier', () => {
    let collection = new NotifierCollection();

    expect(collection.get('alias', {key1: 'val1'})).toBeNull();
})
