import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Usuario extends Model {
  public nome!: string;
  public email!: string;
  public senha!: string;
}

Usuario.init(
  {
    nome: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
  }
);

export default Usuario;

