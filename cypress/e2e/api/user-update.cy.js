/// <reference types="cypress" />

describe('API - Actualización de usuario', () => {
  let apiConfig;

  before(() => {
    // Cargar la configuración de la API
    cy.fixture('api-config.json').then((config) => {
      apiConfig = config;
    });
  });

  it('Debería actualizar un usuario con PUT y código 200', () => {
    const userId = 2;
    const userData = {
      name: 'María López',
      job: 'Software Developer'
    };
    
    cy.request({
      method: 'PUT',
      url: `${apiConfig.baseUrl}/users/${userId}`,
      body: userData,
      failOnStatusCode: false
    }).then((response) => {
      // Verificar código de estado
      expect(response.status).to.eq(200);
      
      // Verificar tiempo de respuesta
      expect(response.duration).to.be.lessThan(apiConfig.timeoutThreshold);
      
      // Verificar estructura de la respuesta
      expect(response.body).to.have.property('name').and.to.eq(userData.name);
      expect(response.body).to.have.property('job').and.to.eq(userData.job);
      expect(response.body).to.have.property('updatedAt');
    });
  });

  it('Debería actualizar parcialmente un usuario con PATCH', () => {
    const userId = 2;
    const userData = {
      job: 'QA Lead'
    };
    
    cy.request({
      method: 'PATCH',
      url: `${apiConfig.baseUrl}/users/${userId}`,
      body: userData,
      failOnStatusCode: false
    }).then((response) => {
      // Verificar código de estado
      expect(response.status).to.eq(200);
      
      // Verificar estructura de la respuesta
      expect(response.body).to.have.property('job').and.to.eq(userData.job);
      expect(response.body).to.have.property('updatedAt');
    });
  });

  it('Debería manejar correctamente la actualización de un ID inexistente', () => {
    const nonExistentId = 999;
    const userData = {
      name: 'Usuario Inexistente',
      job: 'No existe'
    };
    
    cy.request({
      method: 'PUT',
      url: `${apiConfig.baseUrl}/users/${nonExistentId}`,
      body: userData,
      failOnStatusCode: false
    }).then((response) => {
      // La API actualiza incluso IDs inexistentes
      expect(response.status).to.eq(200);
      
      // Verificar que se actualizó correctamente
      expect(response.body).to.have.property('name').and.to.eq(userData.name);
      expect(response.body).to.have.property('updatedAt');
    });
  });
});