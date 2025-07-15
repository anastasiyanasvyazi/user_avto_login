describe('Авторизация - Позитивный сценарий', function () {
    beforeEach(function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#mail').should('be.visible'); // Проверка загрузки формы
    });


    it('Верный пароль и верный логин', function () {
        cy.get('#mail').type('german@dolnikov.ru');
        cy.get('#pass').type('iLoveqastudio1');
        cy.get('#loginButton').should('not.be.disabled').click();
        cy.get('#messageHeader').should('be.visible')
            .and('contain', 'Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    });
});

describe('Восстановление пароля', function () {
    beforeEach(function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#forgotEmailButton').should('be.visible'); // Проверка загрузки формы
    });

    it('Успешное восстановление пароля', function () {
        cy.get('#forgotEmailButton').click();
        cy.get('#mailForgot').type('german@dolnikov.ru');
        cy.get('#restoreEmailButton').click();
        cy.get('#messageHeader').should('be.visible')
            .and('contain', 'Успешно отправили пароль на e-mail');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    });
});

describe('Авторизация - Негативные и позитивные сценарии', function () {
    beforeEach(function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#mail').should('be.visible'); // Проверка загрузки формы
    });


    it('Негативный кейс: Правильный логин, неверный пароль', function () {
        cy.get('#mail').type('german@dolnikov.ru'); // Правильный логин
        cy.get('#pass').type('wrongPassword'); // Неверный пароль
        cy.get('#loginButton').should('not.be.disabled').click(); // Нажать войти
        cy.get('#messageHeader').should('be.visible')
            .and('contain', 'Такого логина или пароля нет'); // Проверка текста ошибки
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверка кнопки крестика
    });

    it('Негативный кейс: Неверный логин, правильный пароль', function () {
    cy.get('#mail').type('invalid@dolnikov.ru'); // Неверный логин
    cy.get('#pass').type('iLoveqastudio1'); // Правильный пароль
    cy.get('#loginButton').should('not.be.disabled').click(); // Нажать войти
    cy.get('#messageHeader', { timeout: 10000 }).should('be.visible')
        .invoke('text').then((text) => {
            cy.log('Сообщение об ошибке: ' + text); // Логируем текст для анализа
        });
    cy.get('#messageHeader').should('be.visible')
        .and('contain', 'Такого логина или пароля нет'); // Ожидаемое сообщение
    cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверка кнопки крестика
});

    it('Негативный кейс: Логин без @, правильный пароль', function () {
        cy.get('#mail').type('germandolnikov.ru'); // Логин без @
        cy.get('#pass').type('iLoveqastudio1'); // Правильный пароль
        cy.get('#loginButton').should('not.be.disabled').click(); // Нажать войти
        cy.get('#messageHeader').should('be.visible')
            .and('contain', 'Нужно исправить проблему валидации'); // Проверка текста ошибки
    });

    it('Позитивный кейс: Приведение логина к строчным буквам', function () {
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Логин с разным регистром
        cy.get('#pass').type('iLoveqastudio1'); // Правильный пароль
        cy.get('#loginButton').should('not.be.disabled').click();
        cy.get('#messageHeader').should('be.visible')
            .and('contain', 'Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    });
});
