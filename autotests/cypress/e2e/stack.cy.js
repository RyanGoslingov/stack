/// <reference types="cypress" />

/*
  Создание, редактирование, удаление записей Район
Создание записи
Редактирование записи
Удаление записи
Удаление записи с вложениями
Закрытие заполненной записи при создании
Создание пустой записи (с пробелом в названии)
Создание пустой записи
Закрытие окна создания записи через кнопку отмена
Закрытие окна создания записи кнопку закрыть окно
*/

describe('Создание, редактирование, удаление записей Район', () => {
  beforeEach(() => {
    cy.authentication()
    cy.accountsPage()
  })

  it("Создание записи", () => {
    cy.btnAddNeighborhood()
    cy.getByDataTestId("Название района").type("Заволжский546")
    cy.getByDataTestId("Номер в списке")
      .clear()
      .type("99")
    cy.getByDataCy("btn-save").click()
    cy.get("td")
      .contains("Заволжский546")
      .should("exist")
  })

  it("Редактирование записи", () => {
    cy.getByDataCy("btn-edit")
      .first()
      .click({force:true})
    cy.getByDataTestId("Название района")
      .clear()
      .type("Заволжский Район76")
    cy.getByDataCy("btn-save").click({force:true}) 
    ///force:true используем, т.к. кнопка не стала активна после изменений, на это была ошибка (в документу СТЕК doc)
    cy.get("td")
      .contains("Заволжский Район76")
      .should("exist")
  })

  it("Удаление записи", () => {
    cy.btnAddNeighborhood()
    cy.getByDataTestId("Название района").type("Заволжский999")
    cy.getByDataTestId("Номер в списке")
      .clear()
      .type("999")
    cy.getByDataCy("btn-save").click()
    cy.getByDataCy("checkbox", {timeout: 1000})
      .last()
      .check({force:true})
    cy.getByDataCy("btn-delete").click()
    cy.getByDataCy("btn-yes").click()
    cy.get("td")
      .contains("Заволжский9996")
      .should("not.exist")
  })

  it("Удаление записи с вложениями", () => {
    cy.getByDataCy("checkbox")
      .first()
      .check({force:true})
    cy.getByDataCy("btn-delete").click()
    cy.getByDataCy("btn-yes").click()
    cy.contains("Нельзя удалить данный уровень", { timeout: 1000 }).should("exist")
  })

  it('Закрытие заполненной записи при создании', () => {
    cy.btnAddNeighborhood()
    cy.getByDataTestId("Название района").type("Закрываем запись")
    cy.getByDataCy("btn-cancel").click()
    cy.contains("Закрываем запись").should("not.exist")
  })

  it('Создание пустой записи (с пробелом в названии)', () => {
    cy.btnAddNeighborhood()
    cy.getByDataTestId("Название района").type(" ")
    cy.getByDataCy("btn-save").click()
  })
  
  it('Создание пустой записи', () => {
    cy.btnAddNeighborhood()
    cy.getByDataCy("btn-save").click()
    cy.get(".v-messages__message").should("have.text", "Поле не может быть пустым")
  })

  it("Закрытие окна создания записи через кнопку отмена", () => {
    cy.btnAddNeighborhood()
    cy.getByDataCy("btn-cancel").click()
  })

  it("Закрытие окна создания записи кнопку закрыть окно", () => {
    cy.btnAddNeighborhood()
    cy.getByDataCy("btn-close").click()
  })


})