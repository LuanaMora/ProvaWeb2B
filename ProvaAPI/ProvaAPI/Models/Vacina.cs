using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace ProvaAPI.Models
{
    public partial class Vacina
    {
        public int IdVacina { get; set; }
        public DateTime? DtVacina { get; set; }
        public double? Peso { get; set; }
        public double? Dosagem { get; set; }
        public string Aplicador { get; set; }
        public string Descricaomedicamento { get; set; }
        public int IdAnimal { get; set; }


        public Animal IdAnimalNavigation { get; set; }
    }
}
