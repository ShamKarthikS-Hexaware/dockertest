using System.Collections.Generic;
using newdotcd.Business.Interfaces;
using newdotcd.Entities.Entities;
using Microsoft.AspNetCore.Mvc;

namespace newdotcd.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HumanController : ControllerBase
    {
        IHumanService _HumanService;
        public HumanController(IHumanService HumanService)
        {
            _HumanService = HumanService;
        }

        // GET: api/Human
        [HttpGet]
        public ActionResult<IEnumerable<Human>> Get()
        {
            return Ok(_HumanService.GetAll());
        }

        [HttpPost]
        public ActionResult<Human> Save(Human Human)
        {
            return Ok(_HumanService.Save(Human));

        }

        [HttpPut("{id}")]
        public ActionResult<Human> Update([FromRoute] string id, Human Human)
        {
            return Ok(_HumanService.Update(id, Human));

        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete([FromRoute] string id)
        {
            return Ok(_HumanService.Delete(id));

        }


    }
}
