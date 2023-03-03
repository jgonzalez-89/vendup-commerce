const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            selectedProduct: null
        },
        actions: {
            setSelectedProduct: (product) => {
                const store = getStore();
                setStore({ selectedProduct: product });
            }
        }
    };
};

export default getState;