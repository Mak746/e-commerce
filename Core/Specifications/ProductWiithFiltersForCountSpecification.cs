using Core.Entities;

namespace Core.Specifications
{
    public class ProductWiithFiltersForCountSpecification:BaseSpecification<Product>
    {
        public ProductWiithFiltersForCountSpecification(ProductSpecParams productSpecParams)
        :base(x=>
        (string.IsNullOrEmpty(productSpecParams.Search) || x.Name.ToLower().Contains(productSpecParams.Search))&&
        (!productSpecParams.BrandId.HasValue || x.ProductBrandId==productSpecParams.BrandId)&&
        (!productSpecParams.TypeId.HasValue || x.ProductTypeId==productSpecParams.TypeId))
        {
        }
    }
}