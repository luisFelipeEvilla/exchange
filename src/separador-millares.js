const $input = document.getElementsByName("amount")[0];

$input.addEventListener("input", (e) => {
     // Remover cualquier caracter que no sea dígito
     const cleanedValue = e.target.value.replace(/\D/g, '');
    
     // Agregar separadores de miles
     const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
     // Establecer el valor formateado en el campo de entrada
     e.target.value = formattedValue;
});
