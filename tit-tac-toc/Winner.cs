using System;
namespace tit_tac_toc
{
    public class Winner
    {
        public Winner(string name, int id = 0)
        {
            Name = name;
            Id = id;
        }

        public Winner(string name)
        {
            Name = name;
            Id = 0;
        }

        public string Name { get; set; }
        public int Id { get; set; }
    }
}
