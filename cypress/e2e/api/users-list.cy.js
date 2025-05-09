/// <reference types="cypress" />

describe('API - Listado de usuarios', () => {
  let apiConfig;

  before(() => {
    // Cargar la configuración de la API
    cy.fixture('api-config.json').then((config) => {
      apiConfig = config;
    });
  });

  it('Debería obtener la lista de usuarios con código 200', () => {
    cy.request({
      method: 'GET',
      url: `${apiConfig.baseUrl}/users`,
      failOnStatusCode: false
    }).then((response) => {
      // Verificar código de estado
      expect(response.status).to.eq(200);
      
      // Verificar tiempo de respuesta
      expect(response.duration).to.be.lessThan(apiConfig.timeoutThreshold);
      
      // Verificar estructura de la respuesta
      expect(response.body).to.have.property('page');
      expect(response.body).to.have.property('per_page');
      expect(response.body).to.have.property('total');
      expect(response.body).to.have.property('total_pages');
      expect(response.body).to.have.property('data').and.to.be.an('array');
      expect(response.body).to.have.property('support').and.to.be.an('object');
      
      // Verificar que hay datos en la respuesta
      expect(response.body.data.length).to.be.greaterThan(0);
    });
  });

  it('Debería obtener la lista de usuarios con paginación', () => {
    cy.request({
      method: 'GET',
      url: `${apiConfig.baseUrl}/users?page=2`,
      failOnStatusCode: false
    }).then((response) => {
      // Verificar código de estado
      expect(response.status).to.eq(200);
      
      // Verificar paginación
      expect(response.body.page).to.eq(2);
    });
  });
});