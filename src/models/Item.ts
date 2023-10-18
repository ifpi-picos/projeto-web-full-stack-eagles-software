import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import IItem  from './interfaces/IItem';

class ItemModel extends Model implements IItem{
  public id!: number;
  public achadoPor!: string;
  public local!: string;
  public armazenado!: string;
  public data!: Date;
  public detalhes!: string;
  public foto!: string;
}

ItemModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    achadoPor: {
      type: DataTypes.STRING,
    },
    local: {
      type: DataTypes.STRING,
    },
    armazenado: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.DATE,
    },
    detalhes: {
      type: DataTypes.STRING,
    },
    foto: {
        type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Item',
  }
);

export default ItemModel;