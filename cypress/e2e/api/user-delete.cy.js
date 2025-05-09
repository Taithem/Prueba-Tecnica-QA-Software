/// <reference types="cypress" />

describe('API - Eliminación de usuario', () => {
  let apiConfig;

  before(() => {
    // Cargar la configuración de la API
    cy.fixture('api-config.json').then((config) => {
      apiConfig = config;
    });
  });

  it('Debería eliminar un usuario con código 204', () => {
    const userId = 2;
    
    cy.request({
      method: 'DELETE',
      url: `${apiConfig.baseUrl}/users/${userId}`,
      failOnStatusCode: false
    }).then((response) => {
      // Verificar código de estado para eliminación exitosa
      expect(response.status).to.eq(204);
      
      // Verificar tiempo de respuesta
      expect(response.duration).to.be.lessThan(apiConfig.timeoutThreshold);
      
      // Verificar que el cuerpo de la respuesta está vacío
      expect(response.body).to.be.empty;
    });
  });

  it('Debería manejar correctamente la eliminación de un ID inexistente', () => {
    const nonExistentId = 999;
    
    cy.request({
      method: 'DELETE',
      url: `${apiConfig.baseUrl}/users/${nonExistentId}`,
      failOnStatusCode: false
    }).then((response) => {
      // La API devuelve 204 incluso para IDs inexistentes
      expect(response.status).to.eq(204);
      
      // Verificar que el cuerpo de la respuesta está vacío
      expect(response.body).to.be.empty;
    });
  });
});