import Vue from 'vue'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Installer from './../src/index';
import axios from "axios";
import JobStatusClient from "../src/core/JobStatusClient";

it('creates a repository instance', () => {
    const localVue = createLocalVue()
    const localAxios = axios;

    localVue.use(Installer, {
        axios: localAxios,
        url: '/test'
    });

    const repo = JobStatusClient.getInstance();
    expect(repo.url).toBe('/test');
    expect(repo.axios).toEqual(axios);
})

