/// <reference types="cypress" />

describe('API - Creación de usuario', () => {
  let apiConfig;

  before(() => {
    // Cargar la configuración de la API
    cy.fixture('api-config.json').then((config) => {
      apiConfig = config;
    });
  });

  it('Debería crear un nuevo usuario con código 201', () => {
    const userData = {
      name: 'Juan Pérez',
      job: 'QA Engineer'
    };
    
    cy.request({
      method: 'POST',
      url: `${apiConfig.baseUrl}/users`,
      body: userData,
      failOnStatusCode: false
    }).then((response) => {
      // Verificar código de estado
      expect(response.status).to.eq(201);
      
      // Verificar tiempo de respuesta
      expect(response.duration).to.be.lessThan(apiConfig.timeoutThreshold);
      
      // Verificar estructura de la respuesta
      expect(response.body).to.have.property('name').and.to.eq(userData.name);
      expect(response.body).to.have.property('job').and.to.eq(userData.job);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('createdAt');
    });
  });

  it('Debería manejar correctamente datos inválidos en la creación', () => {
    // Enviar un objeto vacío como datos de usuario
    cy.request({
      method: 'POST',
      url: `${apiConfig.baseUrl}/users`,
      body: {},
      failOnStatusCode: false
    }).then((response) => {
      // Verificar que aún así se crea (la API es permisiva)
      expect(response.status).to.eq(201);
      
      // Verificar que se generó un ID
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('createdAt');
    });
  });
});