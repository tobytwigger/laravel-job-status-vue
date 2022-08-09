import Vue from 'vue'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Installer from './../../src/index';
import axios from "axios";
import JobStatusRepository from "../../src/core/JobStatusRepository";

it('creates a repository instance', () => {
    const localVue = createLocalVue()
    const localAxios = axios;
    
    localVue.use(Installer, {
        axios: localAxios,
        url: '/test'
    });

    const repo = JobStatusRepository.getInstance();
    expect(repo.url).toBe('/test');
    expect(repo.axios).toEqual(axios);
})

