import { faker } from '@faker-js/faker';

it('registers a new user', () => {
	cy.visit('http://localhost:4200/');

	cy.contains('button', /login/i).click();
	cy.contains('a', /register/i).click();

	cy.get('#username').type(faker.internet.userName());

	const password = faker.internet.password();
	cy.get('#password').type(password);
	cy.get('#password-confirm').type(password);

	cy.get('#email').type(faker.internet.email());
	cy.get('#firstName').type(faker.person.firstName());
	cy.get('#lastName').type(faker.person.lastName());

	cy.get('input[value="Register"]').click();
});
