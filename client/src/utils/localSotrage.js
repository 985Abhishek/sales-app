//for category
export const loadCategories = () => {
    try {
      const serializedData = localStorage.getItem('categories');
      return serializedData ? JSON.parse(serializedData) : [];
    } catch (err) {
      console.error('Failed to load from localStorage', err);
      return [];
    }
  };
  
  export const saveCategories = (categories) => {
    try {
      const serializedData = JSON.stringify(categories);
      localStorage.setItem('categories', serializedData);
    } catch (err) {
      console.error('Failed to save to localStorage', err);
    }
  };

  // for taxes comp
  export const loadTaxes = ()=>{
    try{
      const serializedSales = localStorage.getItem('taxes');
      if(serializedSales === null) {
        return[]
      }
      return JSON.parse(serializedSales)
    }catch (err) {
      console.log("error in loadtaxes")
      return [];
    }
  };

  export const saveTaxes = (taxes) => {
    try {
      const serializedSales = JSON.stringify(taxes)
      localStorage.setItem('taxes', serializedSales)
    } catch (err) {
      console.log('error in the savetaxes');
      
    }
  }
  // for products
  export const loadProducts = ()=>{
    try{
      const serializedSales = localStorage.getItem('products');
      if(serializedSales === null) {
        return[]
      }
      return JSON.parse(serializedSales)
    }catch (err) {
      console.log("error in loadproducts")
      return [];
    }
  };

  export const saveProducts = (products) => {
    try {
      const serializedSales = JSON.stringify(products)
      localStorage.setItem('products', serializedSales)
    } catch (err) {
      console.log('error in the saveproducts');
      
    }
  }

  // for sales
  export const loadSales = ()=> {
    // try{
    //   const serializedSales = localStorage.getItem('sales')
    //   if(serializedSales===null) {
    //     return []
    //   }
    //   return JSON.parse(serializedSales)
    // }catch (err) {
    //   console.log("error in loadingSales");
    //   return [];
    // }
    
      try {
        const serializedData = localStorage.getItem("sales");
        return serializedData ? JSON.parse(serializedData) : [];
      } catch (err) {
        console.error("Error loading sales data from localStorage:", err);
        return [];
      }
    };
  
  export const saveSales = (sales) => {
    try {
      const serializedSales = JSON.stringify(sales)
      localStorage.setItem('sales', serializedSales)
    } catch (err) {
      console.log('error in the saveSales');
return [];
    }
  }

  // for showing sales

  export const loadShowSales = ()=>{
    try{
      const serializedShowSales = localStorage.getItem('sales')
if(serializedShowSales===null) {
  return []
}
return JSON.parse(serializedShowSales)
  }catch (err) {
    console.log('error in loading ShowSales');
    return []
  }  
  }

  export const saveShowSales = (sales) => {
    try{
      const serializedShowSales = JSON.stringify(sales)
      localStorage.setItem('sales', serializedShowSales)
    } catch (err) {
      console.log("error in the saveShowSales");
      
    }

  }

  //save sales list to localstorage 

  export const saveSaleList = (salesList) => {
    try {
      const serializedData = JSON.stringify(salesList)
      localStorage.setItem("salesList", serializedData)
    } catch (err)
 {
  console.log("Error saving sales list to localStorage:", err)
 };
  };

  export const loadSalesList = () => {
    try {
      const serializedData = localStorage.getItem('salesList');
      return serializedData ? JSON.parse(serializedData) : []
    } catch (err) {
      console.log("error in the savelistSales");
            return [];
      
    }
  }
  
  
  