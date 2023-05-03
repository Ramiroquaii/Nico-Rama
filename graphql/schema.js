const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLSchema } = require('graphql');
const { getAllProductos } = require('./resolver.js');

const ProductoType = new GraphQLObjectType({
    name: 'Producto',
    fields: () => ({
        nombre: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        precio: { type: GraphQLFloat },
        foto: { type: GraphQLString},
        stock: { type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getProductos: {
            type: new GraphQLList(ProductoType),
            resolve: getAllProductos
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
