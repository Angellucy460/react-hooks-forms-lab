import React, { useState } from "react";
import Item from "./Item";
import Filter from "./Filter";
import ItemForm from "./ItemForm";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [itemList, setItemList] = useState(items);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (search) => {
    setSearchText(search);
  };

  const handleItemFormSubmit = (newItem) => {
    setItemList([...itemList, newItem]);
  };

  const itemsToDisplay = itemList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        search={searchText}
        onSearchChange={handleSearchChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;