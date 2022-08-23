export const categories = [
    {
      name: 'cars',
      image: 'https://mclaren.scene7.com/is/image/mclaren/DSC00052_6:crop-1x1?wid=1200&hei=1200',
    },
    {
      name: 'fitness',
      image: 'https://images.indianexpress.com/2022/05/sooraj-pancholi_1200_insta.jpg',
    },
    {
      name: 'coding',
      image: 'https://www.computersciencedegreehub.com/wp-content/uploads/2016/02/what-is-coding-768x512.jpg',
    },
    {
      name: 'photo',
      image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    },
    {
      name: 'food',
      image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg',
    },
    {
      name: 'nature',
      image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
    },
    {
      name: 'art',
      image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
    }, {
      name: 'travel',
      image: 'https://economictimes.indiatimes.com/thumb/msid-90314818,width-1200,height-900,resizemode-4,imgsize-84768/traveling.jpg?from=mdr',
    },
    {
      name: 'quotes',
      image: 'https://static.wixstatic.com/media/72c0b2_aa33de33308449f8a292d0e91717ddd7~mv2.png/v1/fill/w_724,h_407,al_c,q_90/72c0b2_aa33de33308449f8a292d0e91717ddd7~mv2.webp',
    }, {
      name: 'cats',
      image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
    }, {
      name: 'dogs',
      image: 'https://i.pinimg.com/236x/1b/c8/30/1bc83077e363db1a394bf6a64b071e9f.jpg',
    },
    {
        name: 'anime',
        image: 'https://thumbs.dreamstime.com/z/anime-visual-effect-icon-167230061.jpg',
      },
      {
        name: 'movies & TV',
        image: 'https://ov10-engine.flamingtext.com/netfu/tmp28002/coollogo_com-313264264.png',
      },
      {
        name: '4k',
        image: 'https://static1.bigstockphoto.com/6/2/1/large2/126956309.jpg',
      },
      {
        name: 'sports',
        image: 'https://cdn.britannica.com/52/139052-131-7A7975D1/Balls-shapes-colors-sizes-sports.jpg',
      },
      {
        name: 'abstract',
        image: 'https://img.freepik.com/premium-vector/multicolored-abstract-background_23-2148463672.jpg?w=2000',
      },
      {
        name: 'gaming',
        image: 'https://inc42.com/wp-content/uploads/2021/10/online-gaming.jpg',
      },
      {
        name: 'minimal',
        image: 'https://media.istockphoto.com/vectors/minimal-a-modern-minimalist-futuristic-alphabet-font-design-vector-id1208887164',
      },
    {
      name: 'others',
      image: 'https://learnenglishfunway.com/ezoimgfmt/mrclown.tv/wp-content/uploads/2014/11/MC_SightWords-Other.jpg?is-pending-load=1&ezimgfmt=rs:650x366/rscb9/ng:webp/ngcb9',
    },
  ];


export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;

    return query
}

export const searchQuery = (searchTerm) => {
    const query = `*[_type == pin && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[]{
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
    }`

    return query;
}

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc) {
    image{
        asset -> {
            url
        }
    },
    _id,
    destination,
    postedBy -> {
        _id,
        userName,
        image
    },
    save[]{
        _key,
        postedBy -> {
            _id,
            userName,
            image
        },
    },
}`

export const userCreatedPinsQuery = (userId) => {
    const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };
  
  export const userSavedPinsQuery = (userId) => {
    const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };

  export const pinDetailQuery = (pinId) => {
    const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`;
    return query;
  };
  
  export const pinDetailMorePinQuery = (pin) => {
    const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };