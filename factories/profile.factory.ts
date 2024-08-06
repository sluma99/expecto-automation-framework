import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import {inpData, systemsData} from "../data/profile.data";

export const profile = Factory.define('profile')
    .attr('systemName', () => faker.helpers.arrayElement(systemsData))
    .attr('apnInp', () => faker.helpers.arrayElement(inpData))
    .attr('bitRate', () => faker.number.int().toString());
