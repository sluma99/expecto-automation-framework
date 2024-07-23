import { faker } from '@faker-js/faker';
import { Factory } from 'rosie'

export const customerName = Factory.define('customerName')
    .attr('name', () => faker.string.alphanumeric(5) + '-' + faker.number.bigInt());
