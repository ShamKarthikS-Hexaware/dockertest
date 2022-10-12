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
    public class When_updating_human : UsingHumanControllerSpec
    {
        private ActionResult<Human > _result;
        private Human _human;

        public override void Context()
        {
            base.Context();

            _human = new Human
            {
                name = "name",
                age = "age",
                planet = "planet"
            };

            _humanService.Update(_human.Id, _human).Returns(_human);
            
        }
        public override void Because()
        {
            _result = subject.Update(_human.Id, _human);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _humanService.Received(1).Update(_human.Id, _human);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<Human>();

            var resultList = resultListObject as Human;

            resultList.ShouldBe(_human);
        }
    }
}
