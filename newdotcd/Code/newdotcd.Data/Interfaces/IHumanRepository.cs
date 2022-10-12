using newdotcd.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace newdotcd.Data.Interfaces
{
    public interface IHumanRepository : IGetAll<Human>, ISave<Human>, IUpdate<Human, string>, IDelete<string>
    {
    }
}
