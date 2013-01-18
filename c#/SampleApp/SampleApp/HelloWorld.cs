using System;
using Nancy;

namespace Demo
{
	public class HomeModule : NancyModule
	{
		public HomeModule ()
		{
			Get ["/"] = _ => "<a href='/foo'>Click Here</a>";
			Get ["/foo"] = _ => "You are on Foo.";
		}
	}
}