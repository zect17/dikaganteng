const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();
const colors = require('colors');
require('dotenv-flow').config();
const { Client, MessageEmbed } = require('discord.js');


colors.setTheme({
  done: 'green',
})

const config = {
  token: process.env.TOKEN,
  owner: process.env.OWNER,
  prefix: process.env.PREFIX,
}

let statuses = ['Capek Anjing','Saran ? Send DM ke @dikk', 'Owner Ganteng BTW', 'ONLINE 24/7', 'BOT OFF,ERROR REPORT KE @dikk#4037', 'Yang Baca Gabut', 'Apaansih Hehehe', 'Ngapain Liatin Cok', 'follow @andikhampp', 'Sarah Viloid Montok', 'info corona? -corona saja', 'Adit Homo Bangsat', 'Conoha Kapan Kelar', 'Capek Saia', 'Error DM @dikk', 'follow @andikhampp'] 

client.on('ready', () => {
    console.log(`Siap bos ${client.user.tag}!`);

    setInterval(function() {
      let status = statuses[Math.floor(Math.random()*statuses.length)];

      client.user.setPresence({ activity: {name: status}, status: 'online' });
    }, 3000)
   
});

client.on('message', message => {
  if (message.content === prefix + 'corona') {
    message.channel.send("please enter your country code, ex : -corona.(code)")
    const embed = new MessageEmbed()
      .setTitle('Code Corona')
      .setColor(12234)
      .setDescription(`:flag_id: Indonesia : id \n :flag_sg: Singapore : sg \n :flag_my: Malaysia : my \n :flag_ph: Philippines : ph \n :flag_us: USA : us`)
    message.channel.send(embed);
  }
  if (message.content === prefix + 'update') {
    const embed = new MessageEmbed()
      .setTitle('Here Bro :)')
      .setColor(12234)
      .setDescription(`New Corona Command ex : -corona.code \n :flag_id: Indonesia : id \n :flag_sg: Singapore : sg \n :flag_my: Malaysia : my \n :flag_ph: Philippines : ph \n :flag_us: USA : us`)
    message.channel.send(embed);
  }
  if (message.content === prefix + 'help') {
    const embed = new MessageEmbed()
      .setTitle('Informations')
      .setColor(12234)
      .setDescription(`command -help di gantikan dengan -menu`)
    message.channel.send(embed);
  }
  if (message.content === prefix + 'menu') {
    const embed = new MessageEmbed()
      .setTitle(':star: Angeline.BOT Menu :star:')
      .setColor(12234)
      .addField('-corona.[code]','Gives You COVID-19 Information -corona for code',true)
      .addField('-weather.[Location Name]','Gives You Weather Information',true)
      .addField('-corona.id','Menampilkan Informasi COVID-19 di Indonesia',true)
      .addField('-corona.data1','Menampilkan Informasi COVID-19 Per-Provinsi di Indonesia', true)
      .addField('-dog','Menampilkan Gambar Anjinx Acak', true)
      .addField('-cat','Menampilkan Gambar Kucing Acak', true)
      .addField('-meme','Menampilkan Gambar Meme Acak',true)
      .addField('-ping','Menampilkan Ping',true)
      .addField('-joke','Menampilkan Joke Acak',true)
      .addField('-quotes','Menampilkan Quotes Acak',true)
      .setTimestamp()
      .setFooter('ty, Updated')
    message.channel.send(embed);
  }
  if (message.content === prefix + 'corona.data') {
    message.channel.send("Silahkan Masukan Nomor dibelakang Command Contoh : -corona.data1")
    const embed = new MessageEmbed()
      .setTitle('Code Corona')
      .setColor(12234)
      .setDescription(`-corona.data1 untuk 10 Provinsi Di Indonesia untuk Provinsi berikutnya ketik -corona.data2 dan corona.data3`)
    message.channel.send(embed);
  }
  
});



client.on('message',  async message => {
   if (message.content === prefix + 'ping'){
      message.channel.send("Wait....").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        m.edit(`Ping: \`${ping}\``)
      })
  }
  if (message.content === prefix + 'joke') {
    let getJoke = async () => {
      let response = await axios.get(
        "https://official-joke-api.appspot.com/random_joke"
      );
      let joke = response.data;
      return joke;    
    };
    let jokeValue = await getJoke();
    const embed = new MessageEmbed()
      .setTitle(jokeValue.setup)
      .setColor(12234)
      .setDescription(jokeValue.punchline);
    message.channel.send(embed);    
  }
  if (message.content === prefix + 'quotes') {
    let getJoke = async () => {
      let response = await axios.get(
        "https://api.quotable.io/random"
      );
      let joke = response.data;
      return joke;    
    };
    let jokeValue = await getJoke();
    const embed = new MessageEmbed()
      .setTitle(jokeValue.content)
      .setColor(12234)
      .setDescription("by " + jokeValue.author);
    message.channel.send(embed);    
  }
  if (message.content === '-corona.id') {
    let getCorona = async () => {
      let response = await axios.get(
        "https://api.teainside.org/corona/?country=Indonesia&fbclid=IwAR0K_-igNyWgi97BAb6e3sHUPTQnyx_HzcElHe_C4NEJHx4wzz29sPUQEKA"
      );
      let corona = response.data;
      return corona; 
    };   
    let getTime = async () => {
      let response = await axios.get(
        "https://api.ipgeolocation.io/timezone?apiKey=9ed5bfa4bdfa4d6a916771bbcd24e4aa&lat=-7.4452823&long=111.03412999999999"
      );
      let time = response.data;
      return time;
    }; 
    let coronaValue = await getCorona(); 
    let timeValue = await getTime();
    const embed = new MessageEmbed()
      .setColor(0xff0000)
      .setTitle(":flag_id: :biohazard: Status COVID-19 di Indonesia :biohazard: :flag_id:")
      .addField(":family_man_boy_boy: Confirmed" , coronaValue.cmt + "(+" + coronaValue.new_cmt + ")", true)
      .addField(":skull_crossbones: Deaths" , coronaValue.fst + "(+" + coronaValue.new_fst + ")", true)
      .addField(":gift_heart: Recovered" , coronaValue.fst, true)
      .setDescription("#Stayhome, Jangan lupa cuci tangan bangsat")
      .setThumbnail("https://cdn.pixabay.com/photo/2020/03/10/08/55/virus-4918308_960_720.png")
      .setFooter("Data From Kawal Corona, Updated "+ timeValue.date_time_txt);
    message.channel.send(embed);    

  }
  if (message.content === '-corona.sg') {
    let getCorona = async () => {
      let response = await axios.get(
        "https://api.teainside.org/corona/?country=singapore"
      );
      let corona = response.data;
      return corona; 
    };   
    let getTime = async () => {
      let response = await axios.get(
        "https://api.ipgeolocation.io/timezone?apiKey=9ed5bfa4bdfa4d6a916771bbcd24e4aa&lat=-7.4452823&long=111.03412999999999"
      );
      let time = response.data;
      return time;
    }; 
    let coronaValue = await getCorona(); 
    let timeValue = await getTime();
    const embed = new MessageEmbed()
      .setColor(0xff0000)
      .setTitle(":flag_sg: :biohazard: Status COVID-19 | Singapore :biohazard: :flag_sg:")
      .addField(":family_man_boy_boy: Confirmed" , coronaValue.cmt + "(+" + coronaValue.new_cmt + ")", true)
      .addField(":skull_crossbones: Deaths" , coronaValue.fst + "(+" + coronaValue.new_fst + ")", true)
      .addField(":gift_heart: Recovered" , coronaValue.fst, true)
      .setDescription("#Stayhome")
      .setThumbnail("https://cdn.pixabay.com/photo/2020/03/10/08/55/virus-4918308_960_720.png")
      .setFooter("Data From Kawal Corona, Updated "+ timeValue.date_time_txt);
    message.channel.send(embed);    
  }
  if (message.content === '-corona.us') {
    let getCorona = async () => {
      let response = await axios.get(
        "https://api.teainside.org/corona/?country=usa"
      );
      let corona = response.data;
      return corona; 
    };   
    let getTime = async () => {
      let response = await axios.get(
        "https://api.ipgeolocation.io/timezone?apiKey=9ed5bfa4bdfa4d6a916771bbcd24e4aa&lat=-7.4452823&long=111.03412999999999"
      );
      let time = response.data;
      return time;
    }; 
    let coronaValue = await getCorona(); 
    let timeValue = await getTime();
    const embed = new MessageEmbed()
      .setColor(0xff0000)
      .setTitle(":flag_us:  :biohazard: Status COVID-19 | USA :biohazard: :flag_us: ")
      .addField(":family_man_boy_boy: Confirmed" , coronaValue.cmt + "(+" + coronaValue.new_cmt + ")", true)
      .addField(":skull_crossbones: Deaths" , coronaValue.fst + "(+" + coronaValue.new_fst + ")", true)
      .addField(":gift_heart: Recovered" , coronaValue.fst, true)
      .setDescription("#Stayhome")
      .setThumbnail("https://cdn.pixabay.com/photo/2020/03/10/08/55/virus-4918308_960_720.png")
      .setFooter("Data From Kawal Corona, Updated "+ timeValue.date_time_txt);
    message.channel.send(embed);    
  }
  if (message.content === '-corona.ph') {
    let getCorona = async () => {
      let response = await axios.get(
        "https://api.teainside.org/corona/?country=philippines"
      );
      let corona = response.data;
      return corona; 
    };   
    let getTime = async () => {
      let response = await axios.get(
        "https://api.ipgeolocation.io/timezone?apiKey=9ed5bfa4bdfa4d6a916771bbcd24e4aa&lat=-7.4452823&long=111.03412999999999"
      );
      let time = response.data;
      return time;
    }; 
    let coronaValue = await getCorona(); 
    let timeValue = await getTime();
    const embed = new MessageEmbed()
      .setColor(0xff0000)
      .setTitle(":flag_ph: :biohazard: Status COVID-19 | Philippines :biohazard: :flag_ph:")
      .addField(":family_man_boy_boy: Confirmed" , coronaValue.cmt + "(+" + coronaValue.new_cmt + ")", true)
      .addField(":skull_crossbones: Deaths" , coronaValue.fst + "(+" + coronaValue.new_fst + ")", true)
      .addField(":gift_heart: Recovered" , coronaValue.fst, true)
      .setDescription("#Stayhome, Jangan lupa cuci tangan bangsat")
      .setThumbnail("https://cdn.pixabay.com/photo/2020/03/10/08/55/virus-4918308_960_720.png")
      .setFooter("Data From Kawal Corona, Updated "+ timeValue.date_time_txt);
    message.channel.send(embed);    

  }
  if (message.content === '-corona.my') {
    let getCorona = async () => {
      let response = await axios.get(
        "https://api.teainside.org/corona/?country=malaysia"
      );
      let corona = response.data;
      return corona; 
    };   
    let getTime = async () => {
      let response = await axios.get(
        "https://api.ipgeolocation.io/timezone?apiKey=9ed5bfa4bdfa4d6a916771bbcd24e4aa&lat=-7.4452823&long=111.03412999999999"
      );
      let time = response.data;
      return time;
    }; 
    let coronaValue = await getCorona(); 
    let timeValue = await getTime();
    const embed = new MessageEmbed()
      .setColor(0xff0000)
      .setTitle(":flag_my: :biohazard: Status COVID-19 | Malaysia :biohazard: :flag_my:")
      .addField(":family_man_boy_boy: Confirmed" , coronaValue.cmt + "(+" + coronaValue.new_cmt + ")", true)
      .addField(":skull_crossbones: Deaths" , coronaValue.fst + "(+" + coronaValue.new_fst + ")", true)
      .addField(":gift_heart: Recovered" , coronaValue.fst, true)
      .setDescription("#Stayhome, Jangan lupa cuci tangan bangsat")
      .setThumbnail("https://cdn.pixabay.com/photo/2020/03/10/08/55/virus-4918308_960_720.png")
      .setFooter("Data From Kawal Corona, Updated "+ timeValue.date_time_txt);
    message.channel.send(embed);    

  }
  if (message.content === '-ramadhan') {
    let getCorona = async () => {
      let response = await axios.get(
        "http://muslimsalat.com/jakarta.json?key=bd099c5825cbedb9aa934e255a81a5fc"
      );
      let corona = response.data;
      return corona; 
    };   
    let getTime = async () => {
      let response = await axios.get(
        "https://api.ipgeolocation.io/timezone?apiKey=9ed5bfa4bdfa4d6a916771bbcd24e4aa&lat=-7.4452823&long=111.03412999999999"
      );
      let time = response.data;
      return time;
    }; 
    let coronaValue = await getCorona(); 
    let timeValue = await getTime();
    const embed = new MessageEmbed()
      .setColor(0xff0000)
      .setTitle("Jadwal Sholat dan Imsakiyah Pada Bulan Ramadhan :crescent_moon: ")
      .addField(":one: **Subuh** ", `${coronaValue.items[0].fajr}`,true)
      .addField(":two: **Dzuhur** ", `${coronaValue.items[0].dhuhr}`, true)
      .addField(":three: **Ashar** ", `${coronaValue.items[0].asr}`, true)
      .addField(":four: **Maghrib** ", `${coronaValue.items[0].maghrib}`,true)
      .addField(":five: **Isyak** ", `${coronaValue.items[0].isha}`,true)
      .addField(":six: **Imsak** ", `4:25 am`,true)
      .setFooter("Data From Muslim Salat, Updated "+ timeValue.date_time_txt);
    message.channel.send(embed);    
  }
  if (message.content === '-corona.data1') {
    let getCorona = async () => {
      let response = await axios.get(
        "https://api.kawalcorona.com/indonesia/provinsi/"
      );
      let corona = response.data;
      return corona; 
    };   
    let getTime = async () => {
      let response = await axios.get(
        "https://api.ipgeolocation.io/timezone?apiKey=9ed5bfa4bdfa4d6a916771bbcd24e4aa&lat=-7.4452823&long=111.03412999999999"
      );
      let time = response.data;
      return time;
    }; 
    let coronaValue = await getCorona(); 
    let timeValue = await getTime();
    const embed = new MessageEmbed()
      .setColor(12234)
      .setTitle("Data :biohazard: COVID-19 :biohazard:  1-10 Provinsi  di INDONESIA")
      .addField(":one:" + `${coronaValue[0].attributes.Provinsi}`,"Positive : " + `${coronaValue[0].attributes.Kasus_Posi}` + ":family_man_boy_boy:    Recovered : " + `${coronaValue[0].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[0].attributes.Kasus_Meni}` + ":family_man_boy_boy:")
      .addField(":two:" + `${coronaValue[1].attributes.Provinsi}`,"Positive : " +  `${coronaValue[1].attributes.Kasus_Posi}`+ ":family_man_boy_boy:    Recovered : " + `${coronaValue[1].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[1].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField(":three:" + `${coronaValue[2].attributes.Provinsi}`,"Positive : " + `${coronaValue[2].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[2].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[2].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField(":four:" + `${coronaValue[3].attributes.Provinsi}`,"Positive : " +  `${coronaValue[3].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[3].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[3].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField(":five:" + `${coronaValue[4].attributes.Provinsi}`,"Positive : " +  `${coronaValue[4].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[4].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[4].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField(":six:"+ `${coronaValue[5].attributes.Provinsi}`,"Positive : " +  `${coronaValue[5].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[5].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[5].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":seven:" + `${coronaValue[6].attributes.Provinsi}`,"Positive : " +  `${coronaValue[6].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[6].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[6].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":eight:"+ `${coronaValue[7].attributes.Provinsi}`,"Positive : " +  `${coronaValue[7].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[7].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[7].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":nine:" + `${coronaValue[8].attributes.Provinsi}`,"Positive : " +  `${coronaValue[8].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[8].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[8].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":one::zero:"+ `${coronaValue[9].attributes.Provinsi}`,"Positive : " +  `${coronaValue[9].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[9].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[9].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .setDescription("#stayhome, untuk Data 11-20 Provinsi Ketik -corona.data2 di Chat :laughing: ")
      .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/1200px-Flag_of_Indonesia.svg.png")
      .setFooter("Updated From Kawal Corona, "+ timeValue.date_time_txt);
    message.channel.send(embed);
  }  
  if (message.content === '-corona.data2') {
    let getCorona = async () => {
      let response = await axios.get(
        "https://api.kawalcorona.com/indonesia/provinsi/"
      );
      let corona = response.data;
      return corona; 
    };   
    let getTime = async () => {
      let response = await axios.get(
        "https://api.ipgeolocation.io/timezone?apiKey=9ed5bfa4bdfa4d6a916771bbcd24e4aa&lat=-7.4452823&long=111.03412999999999"
      );
      let time = response.data;
      return time;
    }; 
    let coronaValue = await getCorona(); 
    let timeValue = await getTime();
    const embed = new MessageEmbed()
      .setColor(12234)
      .setTitle("Data :biohazard: COVID-19 :biohazard:  11-20 Provinsi  di INDONESIA")
      .addField( ":one::one:"+ `${coronaValue[10].attributes.Provinsi}`,"Positive : " +  `${coronaValue[10].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[10].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[10].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":one::two:"+ `${coronaValue[11].attributes.Provinsi}`,"Positive : " +  `${coronaValue[11].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[11].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[11].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":one::three:"+ `${coronaValue[12].attributes.Provinsi}`,"Positive : " +  `${coronaValue[12].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[12].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[12].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":one::four:"+ `${coronaValue[13].attributes.Provinsi}`,"Positive : " +  `${coronaValue[13].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[13].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[13].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":one::five:"+ `${coronaValue[14].attributes.Provinsi}`,"Positive : " +  `${coronaValue[14].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[14].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[14].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":one::six:"+ `${coronaValue[15].attributes.Provinsi}`,"Positive : " +  `${coronaValue[15].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[15].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[15].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":one::seven:"+ `${coronaValue[16].attributes.Provinsi}`,"Positive : " +  `${coronaValue[16].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[16].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[16].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":one::eight:"+ `${coronaValue[17].attributes.Provinsi}`,"Positive : " +  `${coronaValue[17].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[17].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[17].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":one::nine:"+ `${coronaValue[18].attributes.Provinsi}`,"Positive : " +  `${coronaValue[18].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[18].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[18].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":two::zero:"+ `${coronaValue[19].attributes.Provinsi}`,"Positive : " +  `${coronaValue[19].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[19].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[19].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .setDescription("#stayhome, untuk Data 21-30 Provinsi Ketik -corona.data3 di Chat :laughing: ")
      .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/1200px-Flag_of_Indonesia.svg.png")
      .setFooter("Updated From Kawal Corona, "+ timeValue.date_time_txt);
    message.channel.send(embed);
  } 
  if (message.content === '-corona.data3') {
    let getCorona = async () => {
      let response = await axios.get(
        "https://api.kawalcorona.com/indonesia/provinsi/"
      );
      let corona = response.data;
      return corona; 
    };   
    let getTime = async () => {
      let response = await axios.get(
        "https://api.ipgeolocation.io/timezone?apiKey=9ed5bfa4bdfa4d6a916771bbcd24e4aa&lat=-7.4452823&long=111.03412999999999"
      );
      let time = response.data;
      return time;
    }; 
    let coronaValue = await getCorona(); 
    let timeValue = await getTime();
    const embed = new MessageEmbed()
      .setColor(12234)
      .setTitle("Data :biohazard: COVID-19 :biohazard:  21-34 Provinsi  di INDONESIA")
      .addField( ":two::one:"+ `${coronaValue[20].attributes.Provinsi}`,"Positive : " +  `${coronaValue[20].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[20].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[20].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":two::two:"+ `${coronaValue[21].attributes.Provinsi}`,"Positive : " +  `${coronaValue[21].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[21].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[21].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":two::three:"+ `${coronaValue[22].attributes.Provinsi}`,"Positive : " +  `${coronaValue[22].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[22].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[22].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":two::four:"+ `${coronaValue[23].attributes.Provinsi}`,"Positive : " +  `${coronaValue[23].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[23].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[23].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":two::five:"+ `${coronaValue[24].attributes.Provinsi}`,"Positive : " +  `${coronaValue[24].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[24].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[24].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":two::six:"+ `${coronaValue[25].attributes.Provinsi}`,"Positive : " +  `${coronaValue[25].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[25].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[25].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":two::seven:"+ `${coronaValue[26].attributes.Provinsi}`,"Positive : " +  `${coronaValue[26].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[26].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[26].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":two::eight:"+ `${coronaValue[27].attributes.Provinsi}`,"Positive : " +  `${coronaValue[27].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[27].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[27].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":two::nine:"+ `${coronaValue[28].attributes.Provinsi}`,"Positive : " +  `${coronaValue[28].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[28].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[28].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":three::zero:"+ `${coronaValue[29].attributes.Provinsi}`,"Positive : " +  `${coronaValue[29].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[29].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[29].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":three::one:"+ `${coronaValue[30].attributes.Provinsi}`,"Positive : " +  `${coronaValue[30].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[30].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[30].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":three::two:"+ `${coronaValue[31].attributes.Provinsi}`,"Positive : " +  `${coronaValue[31].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[31].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[31].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField( ":three::three:"+ `${coronaValue[32].attributes.Provinsi}`,"Positive : " +  `${coronaValue[32].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[32].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[32].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .addField(":three::four:" + `${coronaValue[33].attributes.Provinsi}`,"Positive : " + `${coronaValue[33].attributes.Kasus_Posi}`+":family_man_boy_boy:    Recovered : " + `${coronaValue[33].attributes.Kasus_Semb}`+ ":family_man_boy_boy:    Meninggal : " + `${coronaValue[33].attributes.Kasus_Meni}`+ ":family_man_boy_boy:")
      .setDescription("#stayhome")
      .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/1200px-Flag_of_Indonesia.svg.png")
      .setFooter("Updated From Kawal Corona, "+ timeValue.date_time_txt);
    message.channel.send(embed);
  }
  if (message.content === prefix + 'meme') {
    let getJoke = async () => {
      let response = await axios.get(
        "https://apis.duncte123.me/meme"
      );
      let joke = response.data;
      return joke;    
    };
    let jokeValue = await getJoke();
    const embed = new MessageEmbed()
      .setColor(12234)
      .setImage(`${jokeValue.data.image}`)
      .setTimestamp()
      .setFooter("Angeline <3")
    message.channel.send(embed);    
  }
  if (message.content === prefix + 'cat') {
    let getJoke = async () => {
      let response = await axios.get(
        "http://aws.random.cat/meow"
      );
      let joke = response.data;
      return joke;    
    };
    let jokeValue = await getJoke();
    const embed = new MessageEmbed()
      .setColor(12234)
      .setImage(`${jokeValue.file}`)
      .setTimestamp()
      .setFooter("Angeline <3")
    message.channel.send(embed);    
  }
  if (message.content === prefix + 'dog') {
    let getJoke = async () => {
      let response = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );
      let joke = response.data;
      return joke;    
    };
    let jokeValue = await getJoke();
    const embed = new MessageEmbed()
      .setColor(12234)
      .setImage(`${jokeValue.message}`)
      .setTimestamp()
      .setFooter("Angeline <3")
    message.channel.send(embed);    
  }
  // if (message.content === '-say') {
  //   let annoucement = message.content.substring(5);
  //   let annoucementChannel = client.channels.cache.find(channel => channel.name.toLoweCase() === 'tabungan');
  //   if(annoucementChannel)
  //   annoucementChannel.send(annoucement);  
  // }
 if(message.content === prefix + 'sahur1') {
    let katakata = ['Tak lelah ditebas mimpi semu, tak hilang disembunyikan langit hitam. Cinta aatau bukan, yang pasti kalu tetap yang terindah. Met makan sahur ya','Ya Allah untukMu aku berpuasa, kepadaMu aku beriman dan dengan rizki dariMu aku berbuka, dengan rahmatMu wahai Yang Maha Penyayang', 'Marhaban ya Ramadhan bulan suci kembali tiba. Saat yang tepat untuk menyucikan diri dari segala dosa. Tak perlu basa basi, mohon dimaafkan segala kesalahan.','Bulan Ramadhan adalah bulan penuh berkah. Bulan Ramadhan adalah rajanya bulan yang dinanti oleh jutaan umat muslim.', 'Bulan Ramadhan adalah bulan penuh berkah. Bulan Ramadhan adalah rajanya bulan yang dinanti oleh jutaan umat muslim.','Baca Alquran walaupun hanya beberapa ayat saja sambil menunggu imsak jauh lebih keren ketimbang nonton TV.','Janganlah engkau tidur sehabis sahur, karena akan membuat hatimu menjadi keras. Selamat sahur!','Yang sulit saat puasa bukan menahan lapar dan dahaga, melainkan menjaga mata, mulut, tangan, kaki dan hati, selamat sahur.','Suasana Ramadhan sungguh indah karena berhiasan cahaya ibadah, menerangi hati semakin cerah buat kita tersenyum Alhamdulillah, bersyukur kepada Allah Yang Maha Pemurah sebelum imsak menegur. Selamat sahur.', 'Di pasar membeli sayur-mayur, telur dadar buat lauk makan. Selamat makan sahur ya, semoga puasa kita semua berlimpah pahala.', 'Bertegur sapa menjalin silaturahmi. Berbagi ucapan bentuk perhatian beribadahlah sebelum mati. Ayolah sahur jangan dilewatkan untuk kekasih hati.', 'Bulan Ramadhan berlimpah berkah. Penuh ampunan serta hidayah. Ayo kita bangun segera. Sebelum imsak datang menyapa.']
    message.channel.send("sahur reminder 1 on")
    const embed = new MessageEmbed()
    .setColor(12234)
    .setTitle("Sahur Reminder <3")
    .setDescription(katakata[Math.floor(Math.random()*katakata.length)] + `\n Semoga Lancar Puasa! \n Niat Puasa \n نَوَيْتُ صَوْمَ غَدٍ عَنْ اَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هذِهِ السَّنَةِ ِللهِ تَعَالَى \n Nawaitu shauma ghadin 'an adaa'i fardhi syahri ramadhaana haadzihis sanati lillahi ta'ala`)
    .setTimestamp()
    .setFooter("Selamat Menunaikan Puasa di Bulan Suci ini")
     message.channel.send(embed);
    setInterval (function() {
      const embed = new MessageEmbed()
      .setColor(12234)
      .setTitle("Sahur Reminder <3")
      .setDescription(katakata[Math.floor(Math.random()*katakata.length)] + `\n Semoga Lancar Puasa! \n Niat Puasa \n نَوَيْتُ صَوْمَ غَدٍ عَنْ اَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هذِهِ السَّنَةِ ِللهِ تَعَالَى \n Nawaitu shauma ghadin 'an adaa'i fardhi syahri ramadhaana haadzihis sanati lillahi ta'ala`)
      .setTimestamp()
      .setFooter("Selamat Menunaikan Puasa di Bulan Suci ini")
    message.channel.send(embed);    
      
    }, 86400000);
  }
  if(message.content === prefix + 'sahur2') {
    let katakata = ['Tak lelah ditebas mimpi semu, tak hilang disembunyikan langit hitam. Cinta aatau bukan, yang pasti kalu tetap yang terindah. Met makan sahur ya','Ya Allah untukMu aku berpuasa, kepadaMu aku beriman dan dengan rizki dariMu aku berbuka, dengan rahmatMu wahai Yang Maha Penyayang', 'Marhaban ya Ramadhan bulan suci kembali tiba. Saat yang tepat untuk menyucikan diri dari segala dosa. Tak perlu basa basi, mohon dimaafkan segala kesalahan.','Bulan Ramadhan adalah bulan penuh berkah. Bulan Ramadhan adalah rajanya bulan yang dinanti oleh jutaan umat muslim.', 'Bulan Ramadhan adalah bulan penuh berkah. Bulan Ramadhan adalah rajanya bulan yang dinanti oleh jutaan umat muslim.','Baca Alquran walaupun hanya beberapa ayat saja sambil menunggu imsak jauh lebih keren ketimbang nonton TV.','Janganlah engkau tidur sehabis sahur, karena akan membuat hatimu menjadi keras. Selamat sahur!','Yang sulit saat puasa bukan menahan lapar dan dahaga, melainkan menjaga mata, mulut, tangan, kaki dan hati, selamat sahur.','Suasana Ramadhan sungguh indah karena berhiasan cahaya ibadah, menerangi hati semakin cerah buat kita tersenyum Alhamdulillah, bersyukur kepada Allah Yang Maha Pemurah sebelum imsak menegur. Selamat sahur.', 'Di pasar membeli sayur-mayur, telur dadar buat lauk makan. Selamat makan sahur ya, semoga puasa kita semua berlimpah pahala.', 'Bertegur sapa menjalin silaturahmi. Berbagi ucapan bentuk perhatian beribadahlah sebelum mati. Ayolah sahur jangan dilewatkan untuk kekasih hati.', 'Bulan Ramadhan berlimpah berkah. Penuh ampunan serta hidayah. Ayo kita bangun segera. Sebelum imsak datang menyapa.']
    message.channel.send("sahur reminder 2 on")
    const embed = new MessageEmbed()
    .setColor(12234)
    .setTitle("Sahur Reminder <3")
    .setDescription(katakata[Math.floor(Math.random()*katakata.length)] + `\n Semoga Lancar Puasa! \n Niat Puasa \n نَوَيْتُ صَوْمَ غَدٍ عَنْ اَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هذِهِ السَّنَةِ ِللهِ تَعَالَى \n Nawaitu shauma ghadin 'an adaa'i fardhi syahri ramadhaana haadzihis sanati lillahi ta'ala`)
    .setTimestamp()
    .setFooter("Selamat Menunaikan Puasa di Bulan Suci ini")
    message.channel.send(embed);
    setInterval (function() {
      const embed = new MessageEmbed()
      .setColor(12234)
      .setTitle("Sahur Reminder <3")
      .setDescription(katakata[Math.floor(Math.random()*katakata.length)] + `\n Semoga Lancar Puasa! \n Niat Puasa \n نَوَيْتُ صَوْمَ غَدٍ عَنْ اَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هذِهِ السَّنَةِ ِللهِ تَعَالَى \n Nawaitu shauma ghadin 'an adaa'i fardhi syahri ramadhaana haadzihis sanati lillahi ta'ala`)
      .setTimestamp()
      .setFooter("Selamat Menunaikan Puasa di Bulan Suci ini")
    message.channel.send(embed);    
      
    }, 86400000);
  }
  if(message.content === prefix + 'sahur3') {
    let katakata = ['Tak lelah ditebas mimpi semu, tak hilang disembunyikan langit hitam. Cinta aatau bukan, yang pasti kalu tetap yang terindah. Met makan sahur ya','Ya Allah untukMu aku berpuasa, kepadaMu aku beriman dan dengan rizki dariMu aku berbuka, dengan rahmatMu wahai Yang Maha Penyayang', 'Marhaban ya Ramadhan bulan suci kembali tiba. Saat yang tepat untuk menyucikan diri dari segala dosa. Tak perlu basa basi, mohon dimaafkan segala kesalahan.','Bulan Ramadhan adalah bulan penuh berkah. Bulan Ramadhan adalah rajanya bulan yang dinanti oleh jutaan umat muslim.', 'Bulan Ramadhan adalah bulan penuh berkah. Bulan Ramadhan adalah rajanya bulan yang dinanti oleh jutaan umat muslim.','Baca Alquran walaupun hanya beberapa ayat saja sambil menunggu imsak jauh lebih keren ketimbang nonton TV.','Janganlah engkau tidur sehabis sahur, karena akan membuat hatimu menjadi keras. Selamat sahur!','Yang sulit saat puasa bukan menahan lapar dan dahaga, melainkan menjaga mata, mulut, tangan, kaki dan hati, selamat sahur.','Suasana Ramadhan sungguh indah karena berhiasan cahaya ibadah, menerangi hati semakin cerah buat kita tersenyum Alhamdulillah, bersyukur kepada Allah Yang Maha Pemurah sebelum imsak menegur. Selamat sahur.', 'Di pasar membeli sayur-mayur, telur dadar buat lauk makan. Selamat makan sahur ya, semoga puasa kita semua berlimpah pahala.', 'Bertegur sapa menjalin silaturahmi. Berbagi ucapan bentuk perhatian beribadahlah sebelum mati. Ayolah sahur jangan dilewatkan untuk kekasih hati.', 'Bulan Ramadhan berlimpah berkah. Penuh ampunan serta hidayah. Ayo kita bangun segera. Sebelum imsak datang menyapa.']
    message.channel.send("sahur reminder 3 on")
    const embed = new MessageEmbed()
    .setColor(12234)
    .setTitle("Sahur Reminder <3")
    .setDescription(katakata[Math.floor(Math.random()*katakata.length)] + `\n Semoga Lancar Puasa! \n Niat Puasa \n نَوَيْتُ صَوْمَ غَدٍ عَنْ اَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هذِهِ السَّنَةِ ِللهِ تَعَالَى \n Nawaitu shauma ghadin 'an adaa'i fardhi syahri ramadhaana haadzihis sanati lillahi ta'ala`)
    .setTimestamp()
    .setFooter("Selamat Menunaikan Puasa di Bulan Suci ini")
     message.channel.send(embed);
    setInterval (function() {
      const embed = new MessageEmbed()
      .setColor(12234)
      .setTitle("Sahur Reminder <3")
      .setDescription(katakata[Math.floor(Math.random()*katakata.length)] + `\n Semoga Lancar Puasa! \n Niat Puasa \n نَوَيْتُ صَوْمَ غَدٍ عَنْ اَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هذِهِ السَّنَةِ ِللهِ تَعَالَى \n Nawaitu shauma ghadin 'an adaa'i fardhi syahri ramadhaana haadzihis sanati lillahi ta'ala`)
      .setTimestamp()
      .setFooter("Selamat Menunaikan Puasa di Bulan Suci ini")
    message.channel.send(embed);    
      
    }, 86400000);
  }
  if(message.content === prefix + 'buka5') {
    let katakata = ['Menahan segala nafsu dan bersikap sabar adalah hal penting dalam berpuasa. Jadilah pribadi lebih baik dengan puasa mu. Selamat Berbuka Puasa.','Selamat berbuka puasa bagi yang menjalankannya. Semoga ibadah kita diterima oleh Allah SWT. Amiin..','Cara terbaik menghukum orang yang telah menyakiti kita ialah dengan berbuat baik kepadanya. – Selamat Berbuka Puasa.','Taburlah kebaikan kepada siapapun, maka kebaikan akan datang menghampirimu. – Selamat Berbuka Puasa.','Kumandang adzan maghrib menandakan bahwa kita telah menang melawan hawa nafsu seharian. – Selamat Berbuka Puasa.','Dalam penantian kadang kita akan menemukan indahnya hidup. – Selamat berbuka puasa.','Selamat menantikan saat berbuka puasa bagi yang sedang menjalankan ibadah puasa. Semoga Allah melipatgandakan pahala kita. Amin..','Berbuka adalah perayaan kemenangan terbaik. – Selamat Berbuka Puasa.','Berbuka adalah perayaan kemenangan terbaik. Yang lagi buka bersama teman, keluarga, kekasih, selamat buka puasa!!','Berbukalah dengan yang sayang, karena yang manis belum tentu sayang. – Selamat Berbuka Puasa','Senyummu saat berbuka itu tiada duanya. – Selamat Berbuka Puasa.','Selamat berbuka puasa bagi yang belum bisa juga buka hati, meski sudah dilupakan dan disakiti dia berkali-kali.','Mungkin jarak telah memisahkan kita, namun setidaknya aku masih bisa mengucapkan Selamat Berbuka Puasa.']
    message.channel.send("buka reminder on")
    const embed = new MessageEmbed()
      .setColor(12234)
      .setTitle("Selamat Berbuka Puasa <3")
      .setDescription(katakata[Math.floor(Math.random()*katakata.length)] + `\n Selamat Berbuka Puasa <3! \n Doa Berbuka Puasa \n للّهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ، وَبِكَ وَعَلَيْكَ تَوَكَّلْتُ. ذَهَبَ الظَّمَأُ وَابْتَلَّتِ العُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شاءَ اللهُ. يا وَاسِعَ الفَضْلِ اِغْفِرْ لِي الحَمْدُ لِلهِ الَّذِي هَدَانِي فَصُمْتُ، وَرَزَقَنِي فَأَفْطَرْتُ \n Allahumma laka sumtu wabika aamantu wa bika wa'alaika tawakkaltu dzahabaz zhama’u wabtallatil ‘urûqu wa tsabatal ajru, insyâ Allah. Yaa waa si'al fadhli ighfirlii alhamdulillahilladzi hadaanii fasumtu warozaqii faafthortu`)
      .setTimestamp()
      .setFooter("Selamat Menunaikan Puasa di Bulan Suci ini")
    message.channel.send(embed);    
    setInterval (function() {
      const embed = new MessageEmbed()
      .setColor(12234)
      .setTitle("Selamat Berbuka Puasa <3")
      .setDescription(katakata[Math.floor(Math.random()*katakata.length)] + `\n Selamat Berbuka Puasa <3! \n Doa Berbuka Puasa \n للّهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ، وَبِكَ وَعَلَيْكَ تَوَكَّلْتُ. ذَهَبَ الظَّمَأُ وَابْتَلَّتِ العُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شاءَ اللهُ. يا وَاسِعَ الفَضْلِ اِغْفِرْ لِي الحَمْدُ لِلهِ الَّذِي هَدَانِي فَصُمْتُ، وَرَزَقَنِي فَأَفْطَرْتُ \n Allahumma laka sumtu wabika aamantu wa bika wa'alaika tawakkaltu dzahabaz zhama’u wabtallatil ‘urûqu wa tsabatal ajru, insyâ Allah. Yaa waa si'al fadhli ighfirlii alhamdulillahilladzi hadaanii fasumtu warozaqii faafthortu`)
      .setTimestamp()
      .setFooter("Selamat Menunaikan Puasa di Bulan Suci ini")
    message.channel.send(embed);    
      
    }, 86400000);
  }
});


const prefix = "-";


client.on("message", async msg => {
  if (!msg.content.startsWith(prefix)) {
    return;
  }

  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  console.log(args);

  if (command === "ego"){
    msg.react("heheeh");
  }

  if (command === "poil") {
    message.channel.send ("message sender: " + message.author.username);
  }

  if (command === "clear") {
    let num = 10;
    if (args[0]) {
      num = parseInt(args[0]) + 1;
    }
    msg.channel.bulkDelete(num);
    msg.channel.send(num);
  }
});



client.on('message', (message) => {
  
  message.content.toLowerCase;

  if (message.author.bot) return;

  msg = message.content.toLowerCase();

  if (msg.startsWith (prefix + "profil")) {
      message.channel.send ('ini gan');
      message.channel.send ("message: " + message);
      message.channel.send ("message sender: " + message.author.username);
      message.channel.send ("message sender ID: " + message.author.id);
      message.channel.send (message.author.displayAvatarURL())
      console.log("Sukses Reply -profil" .done  + message.author.username);
  }

  if (msg.startsWith ("jancok")) {
    message.channel.send ("bacok kontol");
    console.log("Sukses Reply *bacot kontol* ke " .done + message.author.username  .done);
  }

  if (msg.startsWith ("kontol")) {
    message.channel.send ("bajingan lonte kowe asu")
    message.author.send ("ojo misuh wae to su");
    console.log("Sukses Reply *bajingan lonte kowe asu* ke " .done + message.author.username  .done);
    console.log("Sukses DM ojo *kontol mu cilik asw* ke " .done + message.author.username  .done);
  }

  if (msg.startsWith ("ngetod")) {
    message.channel.send ("dasar otak sangean asw");
    console.log("Sukses Reply *dasar otak sangean asw* ke " .done + message.author.username  .done);
  }

  if (msg.startsWith ("ngetot")) {
    message.channel.send ("dasar otak sangean asw");
    console.log("Sukses Reply *dasar otak sangean asw* ke " .done + message.author.username  .done);
  }

  if (msg.startsWith ("ngewe")) {
    message.channel.send ("dasar otak sangean asw");
    console.log("Sukses Reply *dasar otak sangean asw* ke " .done + message.author.username  .done);
  }

  if (msg.startsWith ("bacot")) {
    message.channel.send ("jancok kowe bajingan");
    message.author.send ("Share Loc Anjix Kita gelud")
    console.log("Sukses Reply *jancok kowe bajingan* ke " .done + message.author.username  .done);
    console.log("Sukses DM *Share loc anjix kita gelud* ke " .done + message.author.username  .done);
  }

  if (msg.startsWith ("jembot")) {
    message.channel.send ("mau jembut bau seblac atau bau pandan");
    console.log("Sukses Reply *mau jembut yg bay seblac atau bau pandan* ke " .done + message.author.username  .done);
  }

  if (msg.startsWith ("jembut")) {
    message.channel.send ("mau jembut bau seblac atau bau pandan");
    console.log("Sukses Reply *mau jembut yg bay seblac atau bau pandan* ke " .done + message.author.username  .done);
  }

  if (msg.startsWith ("k")) {
    message.channel.send ("kontolllllll").then(message.react(":clown:"));
    console.log("Sukses Reply *kontolllllll* ke " .done + message.author.username  .done);

  }

  if (msg.startsWith ("p")) {
    message.channel.send ("bacot banget asu");
    console.log("Sukses Reply *bacot banget asu* ke " .done + message.author.username  .done);
  }

  if (msg.startsWith ("z")) {
    message.channel.send ("oposih gak jelas banget goblok");
    console.log("Sukses Reply *oposih gak jelas banget goblok* ke " .done + message.author.username  .done);
  }

  if (msg.startsWith ("add")) {
    message.channel.send ("Sukses Menambahkan :D");
    console.log("New OPEN BO Script +" .done + message.author.username .done );
  }

  if (msg.startsWith ("add dik")) {
    message.channel.send ("MAAF ERORRR");
    console.log("New OPEN BO Script +" .done + message.author.username .done );
  }

  if (msg.startsWith ("maen bos")) {
    message.channel.send ("hayukkk")
    console.log("Sukses Reply *hayukkkk* ke " .done + message.author.username .done);
 
  if (msg.startsWith ("yuk maen")) {
    message.channel.send ("hayukkkk");
    console.log("Sukses Reply *hayukkkk* ke " .done + message.author.username .done);
  }

  if (msg.startsWith ("maen")) {
    message.channel.send ("hayukkkk");
    console.log("Sukses Reply *hayukkkk* ke " .done + message.author.username .done);
  }


  if (msg.startsWith ("ayo dolen")) {
    message.channel.send ("hayukkkk");
    console.log("Sukses Reply *hayukkkk* ke " .done + message.author.username .done);
  }

  if (msg.startsWith ("asc")) {
    message.channel.send ("homo bangsad");
    console.log("Sukses Reply *homo bangsad* ke " .done + message.author.username .done);
  }

  if (msg.startsWith ("p")) {
    message.channel.send ("ngapusi tok asu");
  }

  if (msg.startsWith ("dolen")) {
    message.channel.send ("melu bos tunggoni");
  }

  if (msg.startsWith ("otw")) {
    message.channel.send ("ndang cepet suw");
  }
  
  if (msg.startsWith ("dik")) {
    message.channel.send ("skip sek bos lgi dolan/afk");
  }

  if (msg.startsWith ("omg")) {
    message.channel.send (":clown:");
  }

  if (msg.startsWith ("asu")) {
    message.channel.send ("kowe asu")
    console.log("Sukses Reply *kowe asu* ke " .done + message.author.username .done);
  }

  if (msg.startsWith ("lucu")) {
    message.channel.send ("hahahahahah -_-");
    console.log("Sukses Reply *hahahahahah -_-* ke " .done + message.author.username .done);
  }

  if (msg.startsWith ("fun")) {
    message.channel.send ("hahahahahah -_-");
    console.log("Sukses Reply *hahahahahah -_-* ke " .done + message.author.username .done);
  }

  if (msg.startsWith ("funny")) {
    message.channel.send ("hahahahahah -_-");
    console.log("Sukses Reply *hahahahahah -_-* ke " .done + message.author.username .done);
  }

  if (msg.startsWith ("bajingan")) {
    message.channel.send ("santai iso ra suw");
  }

  if (msg.startsWith ("c")) {
    message.channel.send ("ih kepo banget sih");
  }

  if (msg.startsWith ("diem cok")) {
    message.channel.send ("oke :(");
    console.log("Sukses Reply *oke :(* ke " .done + message.author.username .done);
  }

  if (msg.startsWith ("lol")) {
    message.channel.send (":partying_face: :partying_face: :partying_face: :partying_face:")
    console.log("Sukses Reply *emot");
  }

  if (msg.startsWith ("spam")) {
    msg.react (":partying_face: :partying_face: :partying_face: :partying_face:")
    console.log("Sukses Reply *emot");
  }
    
  }

  if(msg.startsWith (prefix + "open bo")) {
    number = 6
    var random = Math.floor (Math.random() * (number - 1 +1)) +1;
    switch (random) {
        case 1 : message.channel.send ("AUTUMN OPEN BO NO ANAL CHAT DM DISCORD autumn #8293"); break;     
        case 2 : message.channel.send ("OPEN BO( TRUSTED)  include room ➡ apart center point http://lokeruntukku.com http://bokepuntukmu.com BASABASI  White heavy check mark COD NO DP LebahSentot_ #openbo #openbobe"); break;
        case 3 : message.channel.send ("Open COD Malkot Exclude only 20 thn Info RR DM/WA 085704707323"); break;
        case 4 : message.channel.send ("Masih avail Open bo Include at fatmawati Exclude vcs ready Minat?Down pointing backhand index Cash di room"); break;
        case 5 : message.channel.send ("OPEN BO & REAL VCS Lokasi : Surabaya Include/exclude room Vcs 5 SLOT aja ya Splashing sweat symbol RR by DM/WAMobile phone with rightwards arrow at left087748759795"); break;
        case 6 : message.channel.send ("Adit satriaji open BO NO ANAL , GAY , DM TO @lyf"); break;
        
    }

}

if(msg.startsWith (prefix + "funny")) {
  number = 2
  var random = Math.floor (Math.random() * (number - 1 +1)) +1;
  switch (random) {
      case 1 : message.channel.send ("autis banget bangsat"); break;
      case 2 : message.channel.send ("opo sih goblok"); break;        
  }

}

if(msg.startsWith (prefix + "bf4")) {
  number = 2 
  var random = Math.floor (Math.random() * (number - 1 +1)) +1;
  switch (random) {
      case 1 : message.channel.send ("Email or ID  : wojtekmroz@wp.pl")
               message.channel.send ("Password    : Wojkub123")
               message.channel.send ("Note             : Battlefield 4 Premium Edition"); break;     
      case 2 : message.channel.send ("Email or ID  : artemkusch2@gmail.com")
               message.channel.send ("Password    : Boglubov123")
               message.channel.send ("Note             : Battlefield 4 Premium Edition"); break;
      case 3 : message.channel.send ("Email or ID  : poosem06@hotmail.com")
               message.channel.send ("Password    : Poosem21")
               message.channel.send ("Note             : Battlefield 4 Standart Edition"); break;
      case 4 : message.channel.send ("Email or ID  : florian_k2@gmx.de")
               message.channel.send ("Password    : Kabelbinder1 ")
               message.channel.send ("Note             : Battlefield 4 Standart Edition"); break;
      case 5 : message.channel.send ("Email or ID  : moguifangfang@hotmail.com")
               message.channel.send ("Password    : Woaini100ci")
               message.channel.send ("Note             : Battlefield 4 Standart Edition"); break;
      case 6 : message.channel.send ("Email or ID  : liangyu1986@hotmail.com")
               message.channel.send ("Password    : Kurt861127")
               message.channel.send ("Note             : Battlefield 4 Standart Edition"); break;
      case 7 : message.channel.send ("Email or ID  : etienne.lafond@hotmail.fr")
               message.channel.send ("Password    : Q7w8e9r4")
               message.channel.send ("Note             : Battlefield 4 Standart Edition"); break;
      case 8 : message.channel.send ("Email or ID  : cjackson94@hotmail.co.uk")
               message.channel.send ("Password    : Hampster2")
               message.channel.send ("Note             : Battlefield 4 Standart Edition"); break;
      case 9 : message.channel.send ("Email or ID  : daadush@gmail.com")
               message.channel.send ("Password    : Liverpool1")
               message.channel.send ("Note             : Battlefield 4 Standart Edition"); break;
      case 10 : message.channel.send ("Email or ID  : moai_mtg@yahoo.co.jp")
                message.channel.send ("Password    : Moai60119")
                message.channel.send ("Note             : Battlefield 4 Standart Edition"); break;

      
  }
}

if(msg.startsWith (prefix + "bf1")) {
  number = 15 
  var random = Math.floor (Math.random() * (number - 1 +1)) +1;
  switch (random) {
      case 1 : message.channel.send ("Email or ID  : wojtekmroz@wp.pl")
               message.channel.send ("Password    : Wojkub123")
               message.channel.send ("Note             : Battlefield 1 Premium Edition"); break;     
      case 2 : message.channel.send ("Email or ID  : antoniorezza@yandex.ru")
               message.channel.send ("Password    : OdA55GOKYm")
               message.channel.send ("Note             : Battlefield 1 Standart Edition"); break; 
      case 3 : message.channel.send ("Email or ID  : yannik@surfin.de")
               message.channel.send ("Password    : Yanjul111")
               message.channel.send ("Note             : Battlefield 1 Standart Edition"); break; 
      case 4 : message.channel.send ("Email or ID  : melik@foldbjerg.dk")
               message.channel.send ("Password    : Exn67rsp")
               message.channel.send ("Note             : Battlefield 1 Standart Edition"); break; 
      case 5 : message.channel.send ("Email or ID  : said.f.3nity@gmx.de")
               message.channel.send ("Password    : Hunter007")
               message.channel.send ("Note             : Battlefield 1 Standart Edition"); break; 
      case 6 : message.channel.send ("Email or ID  : gochufarmer@gmail.com")
               message.channel.send ("Password    : Daniel627")
               message.channel.send ("Note             : Battlefield 1 Standart Edition"); break; 
      case 7 : message.channel.send ("Email or ID  : viciouselk@live.com")
               message.channel.send ("Password    : Boobies00283")
               message.channel.send ("Note             : Battlefield 1 Standart Edition"); break; 
      case 8 : message.channel.send ("Email or ID  : jumperwar5000@gmail.com")
               message.channel.send ("Password    : Addison5")
               message.channel.send ("Note             : Battlefield 1 Standart Edition"); break; 
      case 9 : message.channel.send ("Email or ID  : tommymari68@gmail.com")
               message.channel.send ("Password    : Bincan13")
               message.channel.send ("Note             : Battlefield 1 Standart Edition"); break; 
      case 10 : message.channel.send ("Email or ID  : jemmehuinink@hotmail.nl")
                message.channel.send ("Password    : Johannes313!")
                message.channel.send ("Note             : Battlefield 1 Standart Edition"); break; 
      case 11 : message.channel.send ("Email or ID  : ironman1683@gmail.com")
                message.channel.send ("Password    : Josue168321090")
                message.channel.send ("Note             : Battlefield 1 Standart Edition"); break; 
      case 12 : message.channel.send ("Email or ID  : anistell@hotmail.com")
                message.channel.send ("Password    : Hitme123")
                message.channel.send ("Note             : Battlefield 1 Standart Edition"); break; 
      case 13 : message.channel.send ("Email or ID  : downlood@163.com")
                message.channel.send ("Password    : Jiang123")
                message.channel.send ("Note             : Battlefield 1 Standart Edition"); break; 
      case 14 : message.channel.send ("Email or ID  : georgesood@gmail.com")
                message.channel.send ("Password    : George1978")
                message.channel.send ("Note             : Battlefield 1 Standart Edition"); break; 
      case 15 : message.channel.send ("Email or ID  : radk33@gmail.com")
                message.channel.send ("Password    : Radek1312!")
                message.channel.send ("Note             : Battlefield 1 Standart Edition"); break; 
  }
}
if(msg.startsWith (prefix + "bf5")) {
  number = 2 
  var random = Math.floor (Math.random() * (number - 1 +1)) +1;
  switch (random) {
      case 1 : message.channel.send ("Email or ID  : nightlistener1@gmail.com")
               message.channel.send ("Password    : XxX386249173553")
               message.channel.send ("Note             : Battlefield V Standart Edition"); break;     
      case 2 : message.channel.send ("Email or ID  : iansauers@gmail.com")
               message.channel.send ("Password    : Dawnbreaker15")
               message.channel.send ("Note             : Battlefield V Standart Edition"); break;
      
  }
}
if(msg.startsWith (prefix + "bf3")) {
  number = 12 
  var random = Math.floor (Math.random() * (number - 1 +1)) +1;
  switch (random) {
      case 1 : message.channel.send ("Email or ID  : baitoubaozou@yahoo.com")
               message.channel.send ("Password    : Qoozoono123")
               message.channel.send ("Note             : Battlefield 3 Standart Edition"); break;     
      case 2 : message.channel.send ("Email or ID  : albumquis@info.lt")
               message.channel.send ("Password    : Pantalonai1")
               message.channel.send ("Note             : Battlefield 3 Standart Edition"); break;
      case 3 : message.channel.send ("Email or ID  : m_bijvank@hotmail.com")
               message.channel.send ("Password    : Kurtdonald1")
               message.channel.send ("Note             : Battlefield 3 Premium Edition"); break;
      case 4 : message.channel.send ("Email or ID  : furiouscloud99@gmail.com")
               message.channel.send ("Password    : K290364m")
               message.channel.send ("Note             : Battlefield 3 Standart Edition"); break;
      case 5 : message.channel.send ("Email or ID  : xmorgus90@wp.pl")
               message.channel.send ("Password    : Koziolek1")
               message.channel.send ("Note             : Battlefield 3 Standart Edition"); break;
      case 6 : message.channel.send ("Email or ID  : sergio.a.reali@gmail.com")
               message.channel.send ("Password    : Cadorna00")
               message.channel.send ("Note             : Battlefield 3 Standart Edition"); break;
      case 7 : message.channel.send ("Email or ID  : enyceckk@yahoo.com")
               message.channel.send ("Password    : Madeinusa1688")
               message.channel.send ("Note             : Battlefield 3 Standart Edition"); break;
      case 8 : message.channel.send ("Email or ID  : joystic12@gmail.com")
               message.channel.send ("Password    : Vkontakte1")
               message.channel.send ("Note             : Battlefield 3 Standart Edition"); break;
      case 9 : message.channel.send ("Email or ID  : kamranchughtai792@gmail.com")
               message.channel.send ("Password    : Battleship7!")
               message.channel.send ("Note             : Battlefield 3 Premium Edition"); break;
      case 10 :message.channel.send ("Email or ID  : gera.nazarov.88@mail.ru")
               message.channel.send ("Password    : Qazwsxedc50")
               message.channel.send ("Note             : Battlefield 3 Premium Edition"); break;
      case 11 : message.channel.send ("Email or ID  : blackwidow195@hotmail.com")
                message.channel.send ("Password    : Thunder157")
                message.channel.send ("Note             : Battlefield 3 Premium Edition"); break;
      case 12 : message.channel.send ("Email or ID  : ms_pain1969@yahoo.com")
                message.channel.send ("Password    : Lancelot77")
                message.channel.send ("Note             : Battlefield 3 Limited Edition"); break;
  }
}
if(msg.startsWith (prefix + "nfs")) {
  number = 3
  var random = Math.floor (Math.random() * (number - 1 +1)) +1;
  switch (random) {
      case 1 : message.channel.send ("Email or ID  : mustafaakmal@gmail.com")
               message.channel.send ("Password    : Chanda12")
               message.channel.send ("Note             : Need For Speed Deluxe Edition"); break;     
      case 2 : message.channel.send ("Email or ID  : motig1000@web.de")
               message.channel.send ("Password    : Maxi0850")
               message.channel.send ("Note             : Need For Speed Standart Edition"); break;
      case 3 : message.channel.send ("Email or ID  : wojtekmroz@wp.pl")
               message.channel.send ("Password    : Wojkub123")
               message.channel.send ("Note             : Need For Speed Standart Edition"); break;
      
  }
}
if(msg.startsWith (prefix + "payback")) {
  number = 4
  var random = Math.floor (Math.random() * (number - 1 +1)) +1;
  switch (random) {
      case 1 : message.channel.send ("Email or ID  : el3men2joselo210@msn.com")
               message.channel.send ("Password    : Yo200810")
               message.channel.send ("Note             : Need For Speed Payback Deluxe Edition"); break;     
      case 2 : message.channel.send ("Email or ID  : basti.bates@gmail.com")
               message.channel.send ("Password    : Opernball08")
               message.channel.send ("Note             : Need For Speed Payback Standart Edition"); break;
      case 3 : message.channel.send ("Email or ID  : wojtekmroz@wp.pl")
               message.channel.send ("Password    : Wojkub123")
               message.channel.send ("Note             : Need For Speed Payback Edition"); break;
      case 4 : message.channel.send ("Email or ID  : artemkusch2@gmail.com")
               message.channel.send ("Password    : Boglubov123")
               message.channel.send ("Note             : Need For Speed Payback Edition"); break;
      
  }
}
if(msg.startsWith (prefix + "tsims4")) {
  number = 9
  var random = Math.floor (Math.random() * (number - 1 +1)) +1;
  switch (random) {
      case 1 : message.channel.send ("Email or ID  :bamurphy2008@gmail.com")
               message.channel.send ("Password    :Saints31")
               message.channel.send ("Note             : The Sims Deluxe Edition"); break;
      case 2 : message.channel.send ("Email or ID  :mjsblib@hotmail.co.uk")
               message.channel.send ("Password    :Teacake1")
               message.channel.send ("Note             : The Sims Deluxe Edition"); break;  
      case 3 : message.channel.send ("Email or ID  :ursulazauner@aon.at")
               message.channel.send ("Password    :Ursula01")
               message.channel.send ("Note             : The Sims Deluxe Edition"); break;  
      case 4 : message.channel.send ("Email or ID  :grimblade@grimblade.com")
               message.channel.send ("Password    :G3mst0ne")
               message.channel.send ("Note             : The Sims Deluxe Edition"); break;  
      case 5 : message.channel.send ("Email or ID  :agibby234@gmail.com")
               message.channel.send ("Password    :Pvj7w22mh")
               message.channel.send ("Note             : The Sims Deluxe Edition"); break;  
      case 6 : message.channel.send ("Email or ID  :lidia@photosinsight.com")
               message.channel.send ("Password    :Travelers1")
               message.channel.send ("Note             : The Sims Deluxe Edition"); break;  
      case 7 : message.channel.send ("Email or ID  :mateusz.kornata@gmail.com")
               message.channel.send ("Password    :Sekret53")
               message.channel.send ("Note             : The Sims Deluxe Edition"); break;  
      case 8 : message.channel.send ("Email or ID  :serkankavuk@hotmail.com")
               message.channel.send ("Password    :Armin7356")
               message.channel.send ("Note             : The Sims Deluxe Edition"); break;  
      case 9 : message.channel.send ("Email or ID  :benschmail@gmx.de")
               message.channel.send ("Password    :Plattenthal12")                                
  }
}

  if (msg.startsWith (prefix +"status")) {
  message.channel.send ("BOT ON")
  }
});


client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'fix');
    if (!channel) return;
    channel.send(`Selamat datang di indomaret selamat belanja, ${member}`);
});



client.login(config.token);
