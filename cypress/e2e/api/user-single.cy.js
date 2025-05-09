/// <reference types="cypress" />

describe('API - Usuario específico', () => {
  let apiConfig;

  before(() => {
    // Cargar la configuración de la API
    cy.fixture('api-config.json').then((config) => {
      apiConfig = config;
    });
  });

  it('Debería obtener un usuario específico con código 200', () => {
    const userId = 2;
    
    cy.request({
      method: 'GET',
      url: `${apiConfig.baseUrl}/users/${userId}`,
      failOnStatusCode: false
    }).then((response) => {
      // Verificar código de estado
      expect(response.status).to.eq(200);
      
      // Verificar tiempo de respuesta
      expect(response.duration).to.be.lessThan(apiConfig.timeoutThreshold);
      
      // Verificar estructura de la respuesta
      expect(response.body).to.have.property('data').and.to.be.an('object');
      expect(response.body.data).to.have.property('id').and.to.eq(userId);
      expect(response.body.data).to.have.property('email');
      expect(response.body.data).to.have.property('first_name');
      expect(response.body.data).to.have.property('last_name');
      expect(response.body.data).to.have.property('avatar');
    });
  });

  it('Debería manejar correctamente un ID de usuario inexistente', () => {
    const nonExistentId = 999;
    
    cy.request({
      method: 'GET',
      url: `${apiConfig.baseUrl}/users/${nonExistentId}`,
      failOnStatusCode: false
    }).then((response) => {
      // Verificar código de estado para usuario no encontrado
      expect(response.status).to.eq(404);
      
      // Verificar que el cuerpo de la respuesta está vacío
      expect(response.body).to.deep.equal({});
    });
  });
});