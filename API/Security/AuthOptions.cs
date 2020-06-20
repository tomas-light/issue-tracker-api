using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace API.Security
{
	public class AuthOptions
	{
		private static readonly string EncryptionKey = "U4MV%EFzQ8j5ok#tv4m2ntY28WJRZ9J5s!LoPiDLtLKa4ebaM^IJH1se%3XD";

		public static readonly string Issuer = "Tomas_Light";
		public static readonly string Audience = "issue-tracker-api";

		// 12 hours
		public static readonly int LifeTimeInMinutes = 720;

		public static SymmetricSecurityKey GenerateSymmetricSecurityKey()
		{
			var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(EncryptionKey));
			return securityKey;
		}
	}
}