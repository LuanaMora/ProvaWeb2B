using System;
using System.Collections.Generic;

namespace ProvaAPI.Models
{
    public partial class Animal
    {
        public Animal()
        {
            Vacina = new HashSet<Vacina>();
        }

        public int IdAnimal { get; set; }
        public string Descricao { get; set; }

        public ICollection<Vacina> Vacina { get; set; }
    }
}
