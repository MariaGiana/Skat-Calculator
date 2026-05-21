"use strict";

//escuchar eventos de click en los botones de modo y mostrar/ocultar el formulario correspondiente
let salaryEstimate=document.querySelector("#salaryEstimate");
salaryEstimate.addEventListener("click", calcularSalary);

let requiredHours=document.querySelector("#requiredHours");
requiredHours.addEventListener("click", calcularHours);

let mostrarFormulario=document.querySelector(".sidebar");

// Mostrar el formulario al hacer clic en "Estimación de Salario" y ocultarlo al hacer clic en "Horas Requeridas"
salaryEstimate.addEventListener("click",  () => {
  mostrarFormulario.style.display = "block";
});

requiredHours.addEventListener("click", () => {
  mostrarFormulario.style.display = "none";
})

const texts = {
  es: {
    salaryEstimate: "Estimación de Salario",
    requiredHours: "Horas Requeridas",
    horas: "Monto por Hora",
    horasTrabajadas: "Horas Trabajadas",
    seleccionar: {
  taxA: "Primaria A",
  taxB: "Secundaria B"
},
    calcular: "Calcular",
    modeDescription: "Calcula el salario mensual despues de impuestos o cuantas horas necesitas trabajar para alcanzar un ingreso objetivo.",
note: "Nota: los resultados son una estimación basada en un modelo simplificado, dan una idea general del ingreso neto en Dinamarca. Puede variar según situación personal, deducciones y reglas fiscales reales."  
},
  en: {
    salaryEstimate: "Salary Estimate",
    requiredHours: "Required Hours",
    horas: "Hourly Rate",
    horasTrabajadas: "Hours Worked",
    seleccionar: {
  taxA: "Primary A",
  taxB: "Secondary B"
},
    modeDescription: "Estimate your monthly net salary after taxes or calculate how many hours you need to work to reach a target income.",
 note: "Note: the results are an estimation based on a simplified model, giving a general idea of net income in Denmark. It can vary based on personal situation, deductions, and actual tax rules."  
}
};

//escuchar eventos de click en los botones de idioma
document.querySelector("#langES").addEventListener("click", () => setLanguage("es"));
document.querySelector("#langEN").addEventListener("click", () => setLanguage("en"));

//funcion para cambiar el idioma del texto en la pagina
function setLanguage(lang) {
  document.querySelector("#horas").textContent = texts[lang].horas;
  console .log(texts[lang].horas);
  document.querySelector("#horasTrabajadas").textContent = texts[lang].horasTrabajadas;
  console .log(texts[lang].horasTrabajadas);
  document.querySelector("#labelTaxA").textContent = texts[lang].seleccionar.taxA;
  document.querySelector("#labelTaxB").textContent = texts[lang].seleccionar.taxB;
  document.querySelector("#modeDescription").textContent = texts[lang].modeDescription;
  document.querySelector("#note").textContent = texts[lang].note;
document.querySelector("#salaryEstimate").textContent = texts[lang].salaryEstimate;
document.querySelector("#requiredHours").textContent = texts[lang].requiredHours;
};


//funciones para calcular salario y horas requeridas (a implementar)

function calcularSalary() {
  console.log("Calculating salary...");



};

function calcularHours() {
 
  console.log("Calculating required hours...");
}

