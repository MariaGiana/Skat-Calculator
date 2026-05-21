"use strict";


let lang = "es";
document.querySelector("#langES").addEventListener("click", () => {
  lang = "es";
  setLanguage(lang);

});

document.querySelector("#langEN").addEventListener("click", () => {
  lang = "en";
  setLanguage(lang);

});

let mode = "salary";
//escuchar eventos de click en los botones de modo y mostrar/ocultar el formulario correspondiente
let salaryEstimate=document.querySelector("#salaryEstimate");
let requiredHours=document.querySelector("#requiredHours");
let mostrarFormulario=document.querySelector(".sidebar");

// Mostrar el formulario al hacer clic en "Estimación de Salario" y ocultarlo al hacer clic en "Horas Requeridas"
salaryEstimate.addEventListener("click", () => {

  mostrarFormulario.style.display = "block";
  mode = "salary";
 document.querySelector("#horasTrabajadas").textContent =
  texts[lang].horasTrabajadas;

   salaryEstimate.classList.add("active");
  requiredHours.classList.remove("active");

  console.log(mode);
});

requiredHours.addEventListener("click", () => {

  mostrarFormulario.style.display = "block";
  mode = "hours";
 document.querySelector("#horasTrabajadas").textContent =
    texts[lang].desiredIncome;

  requiredHours.classList.add("active");
  salaryEstimate.classList.remove("active");

  console.log(mode);
})

let form = document.querySelector("#formulario"); 
form.addEventListener("submit", calculate); 


function calculate(event) {
        event.preventDefault();

        if (mode === "salary") {
            calculateSalary(event);
        }

        if (mode === "hours") {
            calculateHours(event);
        }
        }

        const texts = {
        es: {
            salaryEstimate: "Estimación de Salario",
            requiredHours: "Horas Requeridas",
            horas: "Monto por Hora",
            horasTrabajadas: "Horas Trabajadas",
            desiredIncome: "Monto Deseado",
            seleccionar: {
        taxA: "Primaria A",
        taxB: "Secundaria B"
        },
            modeDescription: "Calcula el salario mensual despues de impuestos o cuantas horas necesitas trabajar para alcanzar un ingreso objetivo.",
        note: "Nota: los resultados son una estimación basada en un modelo simplificado, dan una idea general del ingreso neto en Dinamarca. Puede variar según situación personal, deducciones y reglas fiscales reales."  

        },
        en: {
            salaryEstimate: "Salary Estimate",
            requiredHours: "Required Hours",
            horas: "Hourly Rate",
            horasTrabajadas: "Hours Worked",
            desiredIncome: "Desired Income",
            seleccionar: {
        taxA: "Primary A",
        taxB: "Secondary B"
        },
            modeDescription: "Estimate your monthly net salary after taxes or calculate how many hours you need to work to reach a target income.",

            note: "Note: the results are an estimation based on a simplified model, giving a general idea of net income in Denmark. It can vary based on personal situation, deductions, and actual tax rules."  
        }
        };



//funcion para cambiar el idioma del texto en la pagina
 function setLanguage(lang) {
        document.querySelector("#horas").textContent = texts[lang].horas;
        document.querySelector("#horasTrabajadas").textContent = texts[lang].horasTrabajadas;
        document.querySelector("#labelTaxA").textContent = texts[lang].seleccionar.taxA;
        document.querySelector("#labelTaxB").textContent = texts[lang].seleccionar.taxB;
        document.querySelector("#modeDescription").textContent = texts[lang].modeDescription;
        document.querySelector("#note").textContent = texts[lang].note;
        document.querySelector("#salaryEstimate").textContent = texts[lang].salaryEstimate;
        document.querySelector("#requiredHours").textContent = texts[lang].requiredHours;

        if (mode === "salary") {

        document.querySelector("#horasTrabajadas").textContent =
            texts[lang].horasTrabajadas;

        } else {

        document.querySelector("#horasTrabajadas").textContent =
            texts[lang].desiredIncome;

        }
        document.querySelectorAll(".btnCalcular")
            .forEach(btn => btn.classList.remove("active"));

        document.querySelector(`#lang${lang.toUpperCase()}`)
            .classList.add("active");
        };



const am = 0.08;
const tax = 0.36;
const ferie = 0.125;


//funciones para calcular  horas requeridas (a implementar)

function calculateGeneral(horas, horasTrabajadas, fradrag, tipo){

        let bruto= horas * horasTrabajadas;
        let afterAM = bruto * (1 - am);
        let neto;
        let final;
            
        if(tipo === "conFradrag"){ 
         
        let taxable = afterAM - fradrag;
    
        if (taxable < 0) {
            final = afterAM;
            return { final, afterAM };
            }else {
            neto = taxable * (1 - tax);
            final= neto + (fradrag*(1 - am));
            
    
        }
        }else {
         final = afterAM * (1 - tax);
        }
    
        return { final, afterAM };

        }

function calculateVacationPay(afterAM) {
         let feriepenge = (afterAM *(1-tax)) * ferie;
          return feriepenge;
    }

function calculateHours(event) {

        event.preventDefault();

        document.querySelector("#resultados").innerHTML = "";

        let data = new FormData(form);

        let horas = Number(data.get('horas'));
        let ingresosDeseados = Number(data.get('horasTrabajadas'));
        let fradrag = Number(data.get('fradrag'));
        let tipo = data.get("opcion");
        

        if (!validate(horas, ingresosDeseados, fradrag, tipo)) return;

        const horasTrabajadas = calculateAmountHours(horas, ingresosDeseados, fradrag);

        const resultados = document.querySelector("#resultados");

        resultados.innerHTML = `
            <div class="resultado-card">

            <p>
                Estimated hours needed /necesitas trabajar las siguientes horas:
                <strong>${horasTrabajadas.toFixed(2)}</strong>
            </p>

            <button id="btnBorrar">CLEAR</button>

            </div>
        `;

        form.reset();

        document.querySelector("#btnBorrar")
            .addEventListener("click", limpiarCampos);
        }
                

    function calculateAmountHours(horas, ingresosDeseados, fradrag) {

            const netFactor = 0.590; // Factor para convertir bruto a neto considerando AM y tax
            const fradragFactor = 0.28;

            let adjustedTarget =ingresosDeseados - fradrag * fradragFactor;
            if (adjustedTarget < 0) return 0;

            let horasTrabajadas = adjustedTarget / (horas * netFactor);
            return horasTrabajadas;
            
            }
  

function calculateSalary(event) {
        event.preventDefault();

        document.querySelector("#resultados").innerHTML = "";

        let data = new FormData(form);
        const resultados = document.querySelector("#resultados");

        let horas = Number(data.get('horas'));
        let horasTrabajadas = Number(data.get('horasTrabajadas'));
        let fradrag = Number(data.get('fradrag'));
        console.log("fradrag:", data.get("fradrag"));
        let tipo = data.get("opcion");
        console.log("opcion:", data.get("opcion"));

        if (!validate(horas, horasTrabajadas, fradrag, tipo)) {
            return;
        }

        const { final, afterAM } = calculateGeneral(horas, horasTrabajadas, fradrag, tipo);
        const feriepenge = calculateVacationPay(afterAM); 

        resultados.innerHTML = `
        <div class="resultado-card">

            <p class="resultado-item">
            <span class="label">
                Estimated monthly net income / Ingreso mensual neto estimado
            </span>

            <span class="value">
                ${final.toFixed(2)} DKK
            </span>
            </p>

            <p class="resultado-item">
            <span class="label"> Estimated holiday pay accumulation/ Acumulación estimada de pago de vacaciones
            
            </span>

            <span class="value">
                ${feriepenge.toFixed(2)} DKK
            </span>
            </p>

            <button id="btnBorrar">
            CLEAR
            </button>

        </div>
        `;
        form.reset();

        document.querySelector("#btnBorrar").addEventListener("click", limpiarCampos);
        }


function limpiarCampos() {
        document.querySelector("#resultados").innerHTML = "";
        form.reset();
        }

 function validate(horas, horasTrabajadas, fradrag, tipo) {
        if (isNaN(horas) || horas <= 0) {
        alert("Por favor, ingresa un número válido de horas por semana.");
        return false;

        }
        if (isNaN(horasTrabajadas) || horasTrabajadas <= 0) {
        alert("Por favor, ingresa un número válido de horas trabajadas.");
        return false;
        }

        if (isNaN(fradrag) || fradrag < 0) {
        alert("Por favor, ingresa un número válido para el fradrag.");
        return false;
        }

        if (!tipo) {
        alert("Por favor, selecciona una opcion de Taxcard.");
        return false;
        }

        return true;


        }
