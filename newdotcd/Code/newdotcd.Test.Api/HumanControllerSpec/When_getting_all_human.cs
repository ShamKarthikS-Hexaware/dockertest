using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using newdotcd.Entities.Entities;

namespace newdotcd.Test.Api.HumanControllerSpec
{
    public class When_getting_all_human : UsingHumanControllerSpec
    {
        private ActionResult<IEnumerable<Human>> _result;

        private IEnumerable<Human> _all_human;
        private Human _human;

        public override void Context()
        {
            base.Context();

            _human = new Human{
                name = "name",
                age = "age",
                planet = "planet"
            };

            _all_human = new List<Human> { _human};
            _humanService.GetAll().Returns(_all_human);
        }
        public override void Because()
        {
            _result = subject.Get();
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _humanService.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<List<Human>>();

            List<Human> resultList = resultListObject as List<Human>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_human);
        }
    }
}
