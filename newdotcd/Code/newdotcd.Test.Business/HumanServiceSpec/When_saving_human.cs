using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using newdotcd.Entities.Entities;

namespace newdotcd.Test.Business.HumanServiceSpec
{
    public class When_saving_human : UsingHumanServiceSpec
    {
        private Human _result;

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

            _humanRepository.Save(_human).Returns(true);
        }
        public override void Because()
        {
            _result = subject.Save(_human);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _humanRepository.Received(1).Save(_human);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Human>();

            _result.ShouldBe(_human);
        }
    }
}
