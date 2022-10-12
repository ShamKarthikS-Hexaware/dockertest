using NSubstitute;
using newdotcd.Test.Framework;
using newdotcd.Api.Controllers;
using newdotcd.Business.Interfaces;


namespace newdotcd.Test.Api.HumanControllerSpec
{
    public abstract class UsingHumanControllerSpec : SpecFor<HumanController>
    {
        protected IHumanService _humanService;

        public override void Context()
        {
            _humanService = Substitute.For<IHumanService>();
            subject = new HumanController(_humanService);

        }

    }
}
