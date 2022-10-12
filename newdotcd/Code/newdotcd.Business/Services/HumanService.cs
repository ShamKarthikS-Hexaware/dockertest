using newdotcd.Business.Interfaces;
using newdotcd.Data.Interfaces;
using newdotcd.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace newdotcd.Business.Services
{
    public class HumanService : IHumanService
    {
        IHumanRepository _HumanRepository;

        public HumanService(IHumanRepository HumanRepository)
        {
           this._HumanRepository = HumanRepository;
        }
        public IEnumerable<Human> GetAll()
        {
            return _HumanRepository.GetAll();
        }

        public Human Save(Human Human)
        {
            _HumanRepository.Save(Human);
            return Human;
        }

        public Human Update(string id, Human Human)
        {
            return _HumanRepository.Update(id, Human);
        }

        public bool Delete(string id)
        {
            return _HumanRepository.Delete(id);
        }

    }
}
