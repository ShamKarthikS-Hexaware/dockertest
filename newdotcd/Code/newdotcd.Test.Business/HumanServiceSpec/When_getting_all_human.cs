using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using newdotcd.Entities.Entities;

namespace newdotcd.Test.Business.HumanServiceSpec
{
    public class When_getting_all_human : UsingHumanServiceSpec
    {
        private IEnumerable<Human> _result;

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
            _humanRepository.GetAll().Returns(_all_human);
        }
        public override void Because()
        {
            _result = subject.GetAll();
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _humanRepository.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<List<Human>>();

            List<Human> resultList = _result as List<Human>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_human);
        }
    }
}
