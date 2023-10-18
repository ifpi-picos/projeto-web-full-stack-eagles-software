import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class UsuarioModel extends Model {
  public nome!: string;
  public email!: string;
  public senha!: string;
}

UsuarioModel.init(
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

export default UsuarioModel;

