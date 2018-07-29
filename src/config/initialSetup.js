import colors from './colors';

export const accounts = [
  {
    name: 'Efectivo',
    activityCount: 0,
    hasBalance: true,
    balance: 0,
  },
  {
    name: 'Débito',
    activityCount: 0,
    hasBalance: true,
    balance: 0,
  },
  {
    name: 'Crédito',
    activityCount: 0,
    hasBalance: false,
  },
];

export const categories = [
  {
    name: 'Comida',
    color: colors.blueLight,
    activityCount: 0,
    total: 0,
  },
  {
    name: 'Supermercado',
    color: colors.orange,
    activityCount: 0,
    total: 0,
  },
  {
    name: 'Ropa',
    color: colors.green,
    activityCount: 0,
    total: 0,
  },
  {
    name: 'Fiesta',
    color: colors.danger,
    activityCount: 0,
    total: 0,
  },
  {
    name: 'Entretención',
    color: colors.purple,
    activityCount: 0,
    total: 0,
  },
  {
    name: 'Transporte',
    color: colors.yellow,
    activityCount: 0,
    total: 0,
  },
  {
    name: 'Otros',
    color: colors.gray,
    activityCount: 0,
    total: 0,
  },
];
