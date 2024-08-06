import { faker } from '@faker-js/faker';
import { Factory } from 'rosie'

export const accountData = Factory.define('accountData')
    .attr('email', () => faker.internet.email())
    .attr('password', () => faker.internet.password() + "@2")
    .attr('exampleEmail', () => faker.internet.email());
