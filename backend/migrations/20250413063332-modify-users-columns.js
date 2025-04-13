'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn('Users', 'name', {
        type: Sequelize.STRING,
        allowNull: false
      }, { transaction });
      await queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }, { transaction });
      await queryInterface.changeColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: false
      }, { transaction });
      await transaction.commit();  
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn('Users', 'name', {
        type: Sequelize.STRING,
      }, { transaction });
      await queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
      }, { transaction });
      await queryInterface.changeColumn('Users', 'password', {
        type: Sequelize.STRING,
      }, { transaction });
      await transaction.commit();  
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
