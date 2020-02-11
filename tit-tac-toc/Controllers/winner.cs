using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using Microsoft.Extensions.Logging;

namespace tit_tac_toc.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WinnerController : ControllerBase
    {
        public WinnerController()
        {
            Winners = new List<Winner>();
        }
        public List<Winner> Winners { get; set; }

        [HttpGet]
        public List<Winner> Get()
        {
            var lines = System.IO.File.ReadAllLines("controllers/winners.txt");
            foreach (string line in lines)
            {
                Winners.Add(new Winner(line, Winners.Count));
            }
                //File.WriteAllText(@"C:\words.txt", text + "DERP");
            return Winners;
        }
        [HttpPost]
        public Object Post(Object body)
        {
            var winner = new Winner(body.ToString(), Winners.Count);
            System.IO.File.AppendAllText("controllers/winners.txt", body.ToString() + Environment.NewLine);
            return body;
        }
    }
}
