using System.Collections.Generic;
using backend.Models;

namespace backend.services
{
    public interface IProductRepository
    {
        IEnumerable<Products> GetProductAll();
        Products GetProductByID(int id);
        Products AddProduct(Products model);
        Products UpdateProduct(Products model);
        void DeleteProduct(Products model);

    }
}