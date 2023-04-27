using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace backend.services
{
    public class ProductRepository : IProductRepository
    {
        private readonly DatabaseContext databaseContext;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IWebHostEnvironment webHostEnvironment;

        public ProductRepository(
            DatabaseContext databaseContext,
            IHttpContextAccessor httpContextAccessor,
            IWebHostEnvironment webHostEnvironment)
        {
            this.databaseContext = databaseContext;
            this.httpContextAccessor = httpContextAccessor;
            this.webHostEnvironment = webHostEnvironment;
        }


        public void DeleteProduct(Products result)
        {
            databaseContext.Products.Remove(result);
            databaseContext.SaveChanges();
        }

        public IEnumerable<Products> GetProductAll()
        {
            return databaseContext.Products.ToList();
        }

        public Products GetProductByID(int id)
        {
            return databaseContext.Products.SingleOrDefault(p => p.ProductId == id);
        }


        public Products AddProduct(Products model)
        {
            var image = UploadImage();
            if (!String.IsNullOrEmpty(image))
            {
                model.Image = image;
            }

        //    model.Created = new DateTime(2000,1,1);
        //      model.Created =  DateTime.Now;
                
            databaseContext.Products.Add(model);
            databaseContext.SaveChanges();
            return model;
        }

        public Products UpdateProduct(Products model)
        {
            var image = UploadImage();
            if (!String.IsNullOrEmpty(image))
            {
                model.Image = image;
            }
            databaseContext.Products.Update(model);
            databaseContext.SaveChanges();
            return model;
        }

        private string UploadImage()
        {
            var files = httpContextAccessor.HttpContext.Request.Form.Files;

            if (files.Count > 0)
            {
                const string folder = "/images/";
                string filePath = webHostEnvironment.WebRootPath + folder;

                string fileName = "";

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                foreach (var formFile in files)
                {
                    fileName = Guid.NewGuid().ToString() + System.IO.Path.GetExtension(formFile.FileName); // unique name
                    string fullPath = filePath + fileName;

                    if (formFile.Length > 0)
                    {
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            formFile.CopyTo(stream);
                        }
                    }
                }
                return fileName;
            }
            return null;
        }
    }
}