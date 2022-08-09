import QueryHasher from "../../../src/utils/QueryHasher";

it('hashes an alias and a tag', () => {
    let encoded = QueryHasher.encode('myAlias', {key1: 'val1', key2: 'val2'});
    expect(typeof encoded).toBe('string');
});

it('gives the same results given the same alias and tag', () => {
    let encoded = QueryHasher.encode('myAlias', {key1: 'val1', key2: 'val2'});
    let encodedAgain = QueryHasher.encode('myAlias', {key1: 'val1', key2: 'val2'});
    expect(encoded).toEqual(encodedAgain);
});

it('has a different hash for two aliases and tags', () => {
    let encoded = QueryHasher.encode('myAlias', {key1: 'val1', key2: 'val2'});
    let differentEncode = QueryHasher.encode('myAlias2', {key1: 'val12', key2: 'val22'});
    expect(encoded).not.toEqual(differentEncode);
});

it('can take symbols', () => {
    let encoded = QueryHasher.encode('myAlias&//s.0-=+"', {'key1#/2': 'val1/\\!2', key2: 'val2'});
    expect(typeof encoded).toBe('string');
});

it('can check if two hashes are the same', () => {
    let encoded = QueryHasher.encode('myAlias', {key1: 'val1', key2: 'val2'});
    let differentEncode = QueryHasher.encode('myAlias2', {key1: 'val12', key2: 'val22'});
    expect(
        QueryHasher.check(encoded, 'myAlias', {key1: 'val1', key2: 'val2'})
    ).toBeTruthy();
    expect(
        QueryHasher.check(encoded, 'myAlias2', {key1: 'val12', key2: 'val22'})
    ).toBeFalsy();
    expect(
        QueryHasher.check(differentEncode, 'myAlias', {key1: 'val1', key2: 'val2'})
    ).toBeFalsy();
    expect(
        QueryHasher.check(differentEncode, 'myAlias2', {key1: 'val12', key2: 'val22'})
    ).toBeTruthy();
});