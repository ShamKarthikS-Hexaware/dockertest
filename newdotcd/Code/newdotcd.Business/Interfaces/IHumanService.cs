using newdotcd.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace newdotcd.Business.Interfaces
{
    public interface IHumanService
    {      
        IEnumerable<Human> GetAll();
        Human Save(Human classification);
        Human Update(string id, Human classification);
        bool Delete(string id);

    }
}
