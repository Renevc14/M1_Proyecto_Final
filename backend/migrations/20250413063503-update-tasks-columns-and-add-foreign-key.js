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
      await queryInterface.changeColumn('Tasks', 'title', {
        type: Sequelize.STRING,
        allowNull: false
      }, { transaction });
      await queryInterface.changeColumn('Tasks', 'status', {
        type: Sequelize.STRING,
        defaultValue: 'pending'
      }, { transaction });
      await queryInterface.changeColumn('Tasks', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: false
      }, { transaction });
      await queryInterface.addIndex('Tasks', ['user_id'], {
        name: 'tasks_user_id_index',
        transaction
      });
      await queryInterface.addConstraint('Tasks', {
        fields: ['user_id'],
        type: 'foreign key',
        name: 'fk_user_id',
        references: {
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction
      });
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
      await queryInterface.changeColumn('Tasks', 'title', {
        type: Sequelize.STRING,
      }, { transaction });
      await queryInterface.changeColumn('Tasks', 'status', {
        type: Sequelize.STRING,
      }, { transaction });
      await queryInterface.changeColumn('Tasks', 'user_id', {
        type: Sequelize.INTEGER,
      }, { transaction });
      await queryInterface.removeIndex('Tasks', 'tasks_user_id_index', {
        transaction
      });
      await queryInterface.removeConstraint('Tasks', 'fk_user_id', {
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
